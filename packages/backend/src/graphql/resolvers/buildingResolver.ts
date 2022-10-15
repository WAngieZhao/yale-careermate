import {getGlobalLock} from "framer-motion/types/gestures/drag/utils/lock";
import {ApolloError} from "apollo-server-express";
import uploadS3File from "../../utils/uploadS3File.js";

export const buildingResolver = {
    Building: {
        id: async (parent) => {
            return parent._id
        },
        totalScore: async (parent) => {
            return parent.totalScore / 100
        },
        envScore: async (parent) => {
            return parent.envScore / 100
        },
        secScore: async (parent) => {
            return parent.totalScore / 100
        }
    },
    Query: {
        buildingID: async (parent, {id}, {models: {buildingModel}}, info) => {
            const building = await buildingModel.findById({_id: id}).exec();
            return building;
        },
        buildingName: async (parent, {buildingName}, {models: {buildingModel}}, info) => {
            const building = await buildingModel.findOne({buildingName: buildingName}).exec();
            return building;
        },
        buildingByCity: async (parent, {buildingCity}, {models: {buildingModel}}, info) => {
            const building = await buildingModel.find({buildingCity: buildingCity}).exec();
            return building;
        },
        buildingByState: async (parent, {buildingState}, {models: {buildingModel}}, info) => {
            const building = await buildingModel.find({buildingState: buildingState}).exec();
            return building;
        },
        buildings: async (parent, args, {models: {buildingModel}}, info) => {
            const buildings = await buildingModel.find({}).exec();
            return buildings;
        },
        buildingSearch: async (parent, {buildingName}, {models: {buildingModel}}, info) => {
            const buildings = await buildingModel.aggregate([{
                $addFields: {
                    nameList: {
                        $concat: [
                            '$buildingName',
                            ' ',
                            '$buildingAddress'
                        ]
                    }
                }
            }, {
                $match: {
                    nameList: {
                        $regex: RegExp(buildingName, 'i')
                    }
                }
            }]).exec();
            return buildings;
        },

        advancedBuildingSearch: async (parent, {totalScore, envScore, secScore, buildingName, buildingCity,
            buildingState, fields}, {models: {buildingModel}}, info) => {
            let buildings = await buildingModel.aggregate([{
                $addFields: {
                    nameList: {
                        $concat: [
                            '$buildingName',
                            ' ',
                            '$buildingAddress'
                        ]
                    }
                }
            }, {
                $match: {
                    nameList: {
                        $regex: RegExp(buildingName, 'i')
                    }
                }
            }]).exec();

            if (buildingCity) {
                buildings = buildings.filter(function(building) {
                    return building.buildingCity == buildingCity;
                });
            }

            if (buildingState) {
                buildings = buildings.filter(function(building) {
                    return building.buildingState == buildingState;
                });
            }

            if (totalScore) {
                buildings = buildings.filter(function(building) {
                    return building.totalScore >= (totalScore * 100);
                });
            }

            if (envScore) {
                buildings = buildings.filter(function(building) {
                    return building.envScore >= (envScore * 100);
                });
            }

            if (secScore) {
                buildings = buildings.filter(function(building) {
                    return building.secScore >= (secScore * 100);
                });
            }

            let allBuildings = await buildingModel.find({}).exec();

            for (const field of fields) {
                const newBuildings = await buildingModel.find({[field]: true}).exec();

                if (newBuildings.length === 0) {
                    return [];
                }

                allBuildings = allBuildings.filter(a => newBuildings.some(b => a._id.equals(b._id)));
            }

            buildings = allBuildings.filter(a => buildings.some(b => a._id.equals(b._id)));

            return buildings;
        },

        hasFeature: async (parent, {field}, {models: {buildingModel}}, info) => {
            const buildings = await buildingModel.find({[field]: true}).exec();
            return buildings;
        },

        hasMultiFeatures: async (parent, {fields}, {models: {buildingModel}}, info) => {
            let allBuildings = await buildingModel.find({}).exec();

            for (const field of fields) {
                const newBuildings = await buildingModel.find({[field]: true}).exec();

                if (newBuildings.length === 0) {
                    return [];
                }

                allBuildings = allBuildings.filter(a => newBuildings.some(b => a._id.equals(b._id)));
            }

            return allBuildings;
        },

        goodTotalScore: async (parent, args, {models: {buildingModel}}, info) => {
            const buildings = await buildingModel.find({totalScore: {$gt: 90}}).exec();
            return buildings;
        },
        goodEnvScore: async (parent, args, {models: {buildingModel}}, info) => {
            const buildings = await buildingModel.find({secScore: {$gt: 90}}).exec();
            return buildings;
        },
        goodSecScore: async (parent, args, {models: {buildingModel}}, info) => {
            const buildings = await buildingModel.find({envScore: {$gt: 90}}).exec();
            return buildings;
        },
    },
    Mutation: {
        createBuilding: async (parent, {
            buildingName, buildingAddress, buildingCity, buildingState,photos,reviewCount, totalScore, envScore,
            secScore, isDisFrd,isDisFrdCount, hasParking,hasParkingCount, frontdesk, frontdeskCount,concierge,conciergeCount, gatedCommunity,gatedCommunityCount,
            EVCharging, EVChargingCount,guestParking,guestParkingCount, coveredParking,coveredParkingCount, reservedSpot,reservedSpotCount, freeParking,freeParkingCount,
            cleaningService,cleaningServiceCount, quietHours,quietHoursCount, trashPickUp,trashPickUpCount, staffOnDuty,staffOnDutyCount,
            maintenanceTeam,maintenanceTeamCount,
            microwave,microwaveCount, stove, stoveCount,dishwasher,dishwasherCount, fridge,fridgeCount, washer,washerCount, dryer,dryerCount,
            AC,ACCount, cableInstalled,cableInstalledCount,
            wifiInstalled,wifiInstalledCount, walkInCloset, walkInClosetCount,balcony,balconyCount, gym,gymCount, pool,poolCount, elevator,elevatorCount,
            lounge,loungeCount, mailRoom,mailRoomCount, dogPark,dogParkCount,
            petNumMax, onlyCatDog,onlyCatDogCount
        }, {models: {buildingModel}}, info) => {

            let photoURLs: string[] = [];

            if (photos){
                for (const file of photos) {
                    const {createReadStream, filename, mimetype, encoding} = await file;

                    if (mimetype !== "image/png" && mimetype !== "image/jpeg") {
                        throw new ApolloError('Invalid file type.');
                    }

                    const uploadRes = await uploadS3File(createReadStream, mimetype);
                    const location: string = uploadRes.Location;

                    photoURLs.push(location);
                }
            }

            console.log(photoURLs);

            const building = await buildingModel.create({
                buildingName, buildingAddress, buildingCity, buildingState, photos: photoURLs, reviewCount, totalScore, envScore,
                secScore, isDisFrd,isDisFrdCount, hasParking,hasParkingCount, frontdesk, frontdeskCount,concierge,conciergeCount, gatedCommunity,gatedCommunityCount,
                EVCharging, EVChargingCount,guestParking,guestParkingCount, coveredParking,coveredParkingCount, reservedSpot,reservedSpotCount, freeParking,freeParkingCount,
                cleaningService,cleaningServiceCount, quietHours,quietHoursCount, trashPickUp,trashPickUpCount, staffOnDuty,staffOnDutyCount,
                maintenanceTeam,maintenanceTeamCount,
                microwave,microwaveCount, stove, stoveCount,dishwasher,dishwasherCount, fridge,fridgeCount, washer,washerCount, dryer,dryerCount,
                AC,ACCount, cableInstalled,cableInstalledCount,
                wifiInstalled,wifiInstalledCount, walkInCloset, walkInClosetCount,balcony,balconyCount, gym,gymCount, pool,poolCount, elevator,elevatorCount,
                lounge,loungeCount, mailRoom,mailRoomCount, dogPark,dogParkCount,
                petNumMax, onlyCatDog,onlyCatDogCount
            });
            return building;
        },
    },

};
