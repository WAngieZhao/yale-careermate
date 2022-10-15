import pkg from 'mongoose';
const { Schema, model } = pkg;

const reviewSchema = new Schema({
    // Review and reviewer info
    author: { // Author of the review, reference to the user schema
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    building:{
        type: Schema.Types.ObjectId,
        ref: 'building',
        required: true,
    },
    photos: [{
        type: String,
        default: []
    }],
    comment: { // Comment box, free type
        type: String,
        default:"",
    },
    upVotes: { // Number of up votes received by this review
        type: Number,
        default: 0
    },
    downVotes: { // Number of down votes received by this review
        type: Number,
        default: 0
    },
    //Individual Renter Info
    bedNum:{ // Number of bed room
        type: Number,
        default: 0
    },
    bathNum:{ // Number of bathroom
        type: Number,
        default: 0
    },
    leaseLen:{ // Length of lease term
        type: Number,
        default: 0
    },
    rent:{ // Price of rent
        type: Number,
        default: 0
    },
    colease:{ // Price of rent
        type: Boolean,
        default: 0
    },
    sublease:{ // Price of rent
        type: Boolean,
        default: false
    },
    //Overall Scoring to the apartment building
    totalScore:{ // Total score to the apartment building
        type: Number,
        default: false
    },
    envScore:{ // Environment score to the apartment building
        type: Number,
        default: 0
    },
    secScore:{ // Security score to the apartment building
        type: Number,
        default: 0
    },
    // Public features of the apartment building
    isDisFrd:{ // Is the apartment disability friendly
        type: Boolean,
        default: false
    },
    hasParking:{ // Does the apartment has parking
        type: Boolean,
        default: false
    },
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
    // amenities: { //Public amenities: gym, pool..
    //     type: [String],
    //     default: []
    // },
    // // In-unit features of the apartment building
    // unitFeature: { // In-unit features: washer, dryer..
    //     type: [String],
    //     default: []
    // }

    //Security features in boolean type
    frontdesk:{
        type: Boolean,
        default: false
    },
    concierge:{
        type: Boolean,
        default: false
    },
    gatedCommunity:{
        type: Boolean,
        default: false
    },
    //Parking features in boolean type
    EVCharging:{
        type: Boolean,
        default: false
    },
    guestParking:{
        type: Boolean,
        default: false
    },
    coveredParking:{
        type: Boolean,
        default: false
    },
    reservedSpot:{
        type: Boolean,
        default: false
    },
    freeParking:{
        type: Boolean,
        default: false
    },
    //Management features in boolean type
    cleaningService:{
        type: Boolean,
        default: false
    },
    quietHours:{
        type: Boolean,
        default: false
    },
    trashPickUp:{
        type: Boolean,
        default: false
    },
    staffOnDuty:{
        type: Boolean,
        default: false
    },
    maintenanceTeam:{
        type: Boolean,
        default: false
    },
    //In-unit features in boolean type
    microwave:{
        type: Boolean,
        default: false
    },
    stove:{
        type: Boolean,
        default: false
    },
    dishwasher:{
        type: Boolean,
        default: false
    },
    fridge:{
        type: Boolean,
        default: false
    },
    washer:{
        type: Boolean,
        default: false
    },
    dryer:{
        type: Boolean,
        default: false
    },
    AC:{
        type: Boolean,
        default: false
    },
    cableInstalled:{
        type: Boolean,
        default: false
    },
    wifiInstalled:{
        type: Boolean,
        default: false
    },
    walkInCloset:{
        type: Boolean,
        default: false
    },
    balcony:{
        type: Boolean,
        default: false
    },
    // Public amenities in boolean type
    gym:{
        type: Boolean,
        default: false
    },
    pool:{
        type: Boolean,
        default: false
    },
    elevator:{
        type: Boolean,
        default: false
    },
    lounge:{
        type: Boolean,
        default: false
    },
    mailRoom:{
        type: Boolean,
        default: false
    },
    //Pet friendly features in boolean type
    dogPark:{
        type: Boolean,
        default: false
    },
    petNumMax:{
        type: Number,
        default: 0
    },
    onlyCatDog:{
        type: Boolean,
        default: false
    }



});

export const reviewModel = model('review', reviewSchema);

// export default Model;
