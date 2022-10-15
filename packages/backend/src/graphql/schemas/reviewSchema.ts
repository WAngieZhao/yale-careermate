import { gql } from 'apollo-server';

export const reviewSchema = `
  type Review {
    id: ID!
    photos: [String]
    author: User!
    building: Building!
    comment: String
    upVotes: Int
    downVotes: Int
    bedNum: Int
    bathNum: Int
    leaseLen: Int
    rent: Int,
    colease: Boolean,
    sublease: Boolean,
    totalScore: Int,
    envScore: Int,
    secScore: Int,
    isDisFrd: Boolean,
    hasParking: Boolean,
    frontdesk: Boolean, 
    concierge: Boolean,
    gatedCommunity: Boolean,
    EVCharging: Boolean, 
    guestParking: Boolean, 
    coveredParking: Boolean, 
    reservedSpot: Boolean, 
    freeParking: Boolean,
    cleaningService: Boolean, 
    quietHours: Boolean, 
    trashPickUp: Boolean, 
    staffOnDuty: Boolean, 
    maintenanceTeam: Boolean,
    microwave: Boolean, 
    stove: Boolean, 
    dishwasher: Boolean, 
    fridge: Boolean, 
    washer: Boolean, 
    dryer: Boolean, 
    AC: Boolean, 
    cableInstalled: Boolean, 
    wifiInstalled: Boolean,
    walkInCloset: Boolean, 
    balcony: Boolean, 
    gym: Boolean, 
    pool: Boolean, 
    elevator: Boolean, 
    lounge: Boolean, 
    mailRoom: Boolean, 
    dogPark: Boolean,
    petNumMax: Int, 
    onlyCatDog: Boolean
  }

  extend type Query {
    review_byID(id: ID!): Review!
    reviews: [Review!]!
    review_byAuthor(author: ID!): Review!
    review_byBuilding(building: ID!): [Review!]!
    
    blAvgTotalScore(building: ID!):[Review!]
    blAvgEnvScore(building: ID!): [Review!]
    blAvgSecScore(building: ID!): [Review!]
  }

  extend type Mutation {
    createReview(
    photos: Upload,
    author: ID!, 
    building: ID!, 
    comment: String, 
    upVotes: Int,
    downVotes: Int,
    bedNum: Int,
    bathNum: Int,
    leaseLen: Int,
    rent: Int,
    colease: Boolean,
    sublease: Boolean
    totalScore: Int,
    envScore: Int,
    secScore: Int,
    isDisFrd: Boolean,
    hasParking: Boolean,
    frontdesk: Boolean, 
    concierge: Boolean,
    gatedCommunity: Boolean,
    EVCharging: Boolean, 
    guestParking: Boolean, 
    coveredParking: Boolean, 
    reservedSpot: Boolean, 
    freeParking: Boolean,
    cleaningService: Boolean, 
    quietHours: Boolean, 
    trashPickUp: Boolean, 
    staffOnDuty: Boolean, 
    maintenanceTeam: Boolean,
    microwave: Boolean, 
    stove: Boolean, 
    dishwasher: Boolean, 
    fridge: Boolean, 
    washer: Boolean, 
    dryer: Boolean, 
    AC: Boolean, 
    cableInstalled: Boolean, 
    wifiInstalled: Boolean,
    walkInCloset: Boolean, 
    balcony: Boolean, 
    gym: Boolean, 
    pool: Boolean, 
    elevator: Boolean, 
    lounge: Boolean, 
    mailRoom: Boolean, 
    dogPark: Boolean,
    petNumMax: Int, 
    onlyCatDog: Boolean): Review!
  }
`;
