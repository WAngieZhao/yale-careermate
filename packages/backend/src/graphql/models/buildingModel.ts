import pkg from 'mongoose';

const { Schema, model } = pkg;


const buildingSchema = new Schema({
    buildingName:{
        type: String,
        required: true,
        unique: true
    },
    buildingAddress:{
        type: String,
        required: true,
        unique: true,
    },
    buildingCity:{
        type: String,
        required: true,
        unique: false,
    },
    buildingState:{
        type: String,
        required: true,
        unique: false,
    },
    photos: [{
        type: String,
        default: []
    }],
    reviewCount:{ // added for association with reviews
        type: Number,
        default: 0,
    },
    totalScore:{ // Total score to the apartment building
        type: Number,
        default: 0
    },
    envScore:{ // Environment score to the apartment building
        type: Number,
        default: 0
    },
    secScore:{ // Security score to the apartment building
        type: Number,
        default: 0
    },
    isDisFrd:{ // Is the apartment disability friendly
        type: Boolean,
        default: false
    },
    isDisFrdCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    hasParking:{ // Does the apartment has parking
        type: Boolean,
        default: false
    },
    hasParkingCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    // Previous version in string
    // secFeature: { // Security features: front-desk...
    //     type: [String],
    //     default: []
    // },
    // parkingFeature: { // Parking features: private parking, electronic vehicle...
    //     type: [String],
    //     default: []
    // },
    // mngFeature: { // Management features: maintenance team..
    //     type: [String],
    //     default: []
    // },
    // unitFeature: { // In-unit features: washer, dryer..
    //     type: [String],
    //     default: []
    // },
    // amenities: { //Public amenities: gym, pool..
    //     type: [String],
    //     default: []
    // }


    //Security features in boolean type
    frontdesk:{
        type: Boolean,
        default: false
    },
    frontdeskCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    concierge:{
        type: Boolean,
        default: false
    },
    conciergeCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    gatedCommunity:{
        type: Boolean,
        default: false
    },
    gatedCommunityCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    //Parking features in boolean type
    EVCharging:{
        type: Boolean,
        default: false
    },
    EVChargingCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    guestParking:{
        type: Boolean,
        default: false
    },
    guestParkingCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    coveredParking:{
        type: Boolean,
        default: false
    },
    coveredParkingCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    reservedSpot:{
        type: Boolean,
        default: false
    },
    reservedSpotCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    freeParking:{
        type: Boolean,
        default: false
    },
    freeParkingCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    //Management features in boolean type
    cleaningService:{
        type: Boolean,
        default: false
    },
    cleaningServiceCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    quietHours:{
        type: Boolean,
        default: false
    },
    quietHoursCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    trashPickUp:{
        type: Boolean,
        default: false
    },
    trashPickUpCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    staffOnDuty:{
        type: Boolean,
        default: false
    },
    staffOnDutyCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    maintenanceTeam:{
        type: Boolean,
        default: false
    },
    maintenanceTeamCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    //In-unit features in boolean type
    microwave:{
        type: Boolean,
        default: false
    },
    microwaveCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    stove:{
        type: Boolean,
        default: false
    },
    stoveCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    dishwasher:{
        type: Boolean,
        default: false
    },
    dishwasherCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    fridge:{
        type: Boolean,
        default: false
    },
    fridgeCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    washer:{
        type: Boolean,
        default: false
    },
    washerCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    dryer:{
        type: Boolean,
        default: false
    },
    dryerCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    AC:{
        type: Boolean,
        default: false
    },
    ACCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    cableInstalled:{
        type: Boolean,
        default: false
    },
    cableInstalledCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    wifiInstalled:{
        type: Boolean,
        default: false
    },
    wifiInstalledCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    walkInCloset:{
        type: Boolean,
        default: false
    },
    walkInClosetCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    balcony:{
        type: Boolean,
        default: false
    },
    balconyCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    // Public amenities in boolean type
    gym:{
        type: Boolean,
        default: false
    },
    gymCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    pool:{
        type: Boolean,
        default: false
    },
    poolCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    elevator:{
        type: Boolean,
        default: false
    },
    elevatorCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    lounge:{
        type: Boolean,
        default: false
    },
    loungeCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    mailRoom:{
        type: Boolean,
        default: false
    },
    mailRoomCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    //Pet friendly features in boolean type
    dogPark:{
        type: Boolean,
        default: false
    },
    dogParkCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },
    petNumMax:{
        type: Number,
        default: 0
    },
    onlyCatDog:{
        type: Boolean,
        default: false
    },
    onlyCatDogCount:{ // Is the apartment disability friendly
        type: Number,
        default: 0
    },

});

export const buildingModel = model('building', buildingSchema);

// export default userModel;
