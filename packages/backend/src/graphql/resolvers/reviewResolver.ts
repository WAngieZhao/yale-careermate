import {ApolloError} from "apollo-server-express";
import AWS from "aws-sdk";
import {nanoid} from "nanoid";
import stream from "stream";
import uploadS3File from "../../utils/uploadS3File.js";
import {buildingModel} from "../models/buildingModel.js";
import {reviewModel} from "../models/reviewModel.js";
import {userModel} from "../models/userModel.js";

export const reviewResolver = {
    Query: {
        review_byID: async (parent, { id }, { models: { reviewModel } }, info) => {
            const review = await reviewModel.findById({ _id: id }).exec();
            return review;
        },
        reviews: async (parent, args, { models: { reviewModel } }, info) => {
            const reviews = await reviewModel.find({}).exec();
            return reviews;
        },
        review_byAuthor: async (parent, { author }, { models: { reviewModel } }, info) => {
            const review = await reviewModel.findOne({ author: author }).exec();
            return review;
        },
        review_byBuilding: async (parent, { building }, { models: { reviewModel } }, info) => {
            const review = await reviewModel.find({ building: building }).exec();
            return review;
        },
        blAvgTotalScore: async (parent, { building }, {models: {buildingModel, reviewModel}}, info) => {
            const targetBuilding = await buildingModel.findOne({_id: building}).exec();
            const average =  targetBuilding.totalScore;
            const reviews = await reviewModel.find({totalScore: {$lt: average}}).exec();
            return reviews;
        },
        blAvgEnvScore: async (parent, { building }, {models: {buildingModel, reviewModel}}, info) => {
            const targetBuilding = await buildingModel.findOne({_id: building}).exec();
            const average =  targetBuilding.envScore;
            const reviews = await reviewModel.find({envScore: {$lt: average}}).exec();
            return reviews;
        },
        blAvgSecScore: async (parent, { building }, {models: {buildingModel, reviewModel}}, info) => {
            const targetBuilding = await buildingModel.findOne({_id: building}).exec();
            const average =  targetBuilding.secScore;
            const reviews = await reviewModel.find({secScore: {$lt: average}}).exec();
            return reviews;
        },
    },
    Mutation: {
        createReview: async (parent, { photos, author, building, comment, upVotes, downVotes, bedNum, bathNum,
                                        leaseLen, rent, colease, sublease, totalScore, envScore,
                                        secScore, isDisFrd, hasParking, frontdesk, concierge,gatedCommunity,
                                    EVCharging, guestParking, coveredParking, reservedSpot, freeParking,
                                    cleaningService, quietHours, trashPickUp, staffOnDuty, maintenanceTeam,
                                microwave, stove, dishwasher, fridge, washer, dryer, AC, cableInstalled, wifiInstalled,
                                        walkInCloset, balcony, gym, pool, elevator, lounge, mailRoom, dogPark,
                                    petNumMax, onlyCatDog }, { session }, info) => {

            let photoURLs: string[] = [];

            if (photos) {
                for (const file of photos) {
                    const { createReadStream, filename, mimetype, encoding } = await file;

                    if (mimetype !== "image/png" && mimetype !== "image/jpeg") {
                        throw new ApolloError('Invalid file type.');
                    }

                    const uploadRes = await uploadS3File(createReadStream, mimetype);
                    const location: string = uploadRes.Location;

                    photoURLs.push(location);
                }
            }

            console.log(photoURLs);


            const review = await reviewModel.create({ photos: photoURLs, author, building, comment, upVotes, downVotes, bedNum, bathNum,
                leaseLen, rent, colease, sublease, totalScore, envScore,
                secScore, isDisFrd, hasParking, frontdesk, concierge,gatedCommunity,
                EVCharging, guestParking, coveredParking, reservedSpot, freeParking,
                cleaningService, quietHours, trashPickUp, staffOnDuty, maintenanceTeam,
                microwave, stove, dishwasher, fridge, washer, dryer, AC, cableInstalled, wifiInstalled,
                walkInCloset, balcony, gym, pool, elevator, lounge, mailRoom, dogPark,
                petNumMax, onlyCatDog});

            let newBuilding = await buildingModel.findById({_id: building}).exec();

            // NEEDS FIX --- CONVERT INT TO DOUBLE --- WORK ON DEFINING MODEL SCHEMA!!!
            newBuilding.totalScore = ((newBuilding.totalScore * newBuilding.reviewCount + totalScore * 100) / (newBuilding.reviewCount + 1)).toFixed();
            newBuilding.envScore = ((newBuilding.envScore * newBuilding.reviewCount + envScore * 100) / (newBuilding.reviewCount + 1)).toFixed();
            newBuilding.secScore = ((newBuilding.secScore * newBuilding.reviewCount + secScore * 100) / (newBuilding.reviewCount + 1)).toFixed();

            newBuilding.reviewCount += 1;

            newBuilding.photos = newBuilding.photos.concat(photoURLs);

            let dict = {
                colease: colease, sublease: sublease, isDisFrd: isDisFrd, hasParking: hasParking, frontdesk: frontdesk,
                concierge: concierge, gatedCommunity: gatedCommunity, EVCharging: EVCharging, guestParking: guestParking,
                coveredParking: coveredParking, reservedSpot: reservedSpot, freeParking: freeParking,
                cleaningService: cleaningService, quietHours: quietHours, trashPickUp: trashPickUp,
                staffOnDuty: staffOnDuty, maintenanceTeam: maintenanceTeam, microwave: microwave, stove: stove,
                dishwasher: dishwasher, fridge: fridge, washer: washer, dryer: dryer, AC: AC,
                cableInstalled: cableInstalled, wifiInstalled: wifiInstalled, walkInCloset: walkInCloset, balcony: balcony,
                gym: gym, pool: pool, elevator: elevator, lounge: lounge, mailRoom: mailRoom, dogPark: dogPark,
                onlyCatDog: onlyCatDog
            }

            Object.keys(dict).forEach(function(key) {
                let name = key + "Count";
                newBuilding[name] += dict[key] ? 1 : 0;
                newBuilding[key] = newBuilding[name] >= 5;
            });

            await buildingModel.replaceOne({_id: building}, newBuilding).exec();

            return review;
        },
    },
    Review: {
        author: async ({ author }, args, { models: { userModel } }, info) => {
            const user = await userModel.findById({ _id: author }).exec();
            return user;
        },
        building: async ({ building }, args, { models: { buildingModel } }, info) => {
            const user = await buildingModel.findById({ _id: building }).exec();
            return user;
        },
    },
};
