/**
 * Created by jovialis (Dylan Hanson) on 3/18/22.
 */

import {config as loadDotEnv} from "dotenv";
import mongoose from "mongoose";
import {config} from "../config.js";

import {buildingModel} from "../graphql/models/buildingModel.js";
import {faker} from "@faker-js/faker";
import {reviewModel} from "../graphql/models/reviewModel.js";
import {userModel} from "../graphql/models/userModel.js";

const GENERATE_COUNT = 2000;

(async function () {

	loadDotEnv();
	await mongoose.connect(config.MONGODB_URL);

	for (let i = 0 ; i < GENERATE_COUNT ; i++) {
		if (i % 25 === 0) console.log(`Generating review ${i}`);
		await generateReviews();
	}

})().then(() => {
	process.exit()
});

async function generateReviews(retries = 0) {
	if (retries > 5) {
		return;
	}

	try {
		const userCount = await userModel.countDocuments();
		const randomUser = Math.floor(Math.random() * userCount);
		const user = await userModel.findOne().skip(randomUser);

		const buildingCount = await buildingModel.countDocuments();
		const randomBuilding = Math.floor(Math.random() * buildingCount);
		const building = await buildingModel.findOne().skip(randomBuilding);

		await reviewModel.create({
			author: user,
			building: building,
			photos: Array.from(Array(Math.floor(Math.random() * 6)).keys()).map(() => "https://placeimg.com/640/480/arch"),

			comment: faker.lorem.paragraph(),
			upVotes: faker.datatype.number(200),
			downVoteS: faker.datatype.number(40),

			bedNum: faker.datatype.number(3),
			bathNum: faker.datatype.number(6),
			leaseLen: faker.datatype.number(12),
			rent: faker.datatype.number({
				min: 1000,
				max: 6000
			}),
			colease: faker.datatype.boolean(),
			sublease: faker.datatype.boolean(),

			buildingName: faker.company.companyName(),
			buildingAddress: faker.address.streetAddress(),
			totalScore: faker.datatype.number(5),
			envScore: faker.datatype.number(5),
			secScore: faker.datatype.number(5),
			isDisFrd: faker.datatype.boolean(),
			hasParking: faker.datatype.boolean(),

			//Security features in boolean type
			frontdesk: faker.datatype.boolean(),
			concierge: faker.datatype.boolean(),
			gatedCommunity: faker.datatype.boolean(),
			//Parking features in boolean type
			EVCharging: faker.datatype.boolean(),
			guestParking: faker.datatype.boolean(),
			coveredParking: faker.datatype.boolean(),
			reservedSpot: faker.datatype.boolean(),
			freeParking: faker.datatype.boolean(),
			//Management features in boolean type
			cleaningService: faker.datatype.boolean(),
			quietHours: faker.datatype.boolean(),
			trashPickUp: faker.datatype.boolean(),
			staffOnDuty: faker.datatype.boolean(),
			maintenanceTeam: faker.datatype.boolean(),
			//In-unit features in boolean type
			microwave: faker.datatype.boolean(),
			stove: faker.datatype.boolean(),
			dishwasher: faker.datatype.boolean(),
			fridge: faker.datatype.boolean(),
			washer: faker.datatype.boolean(),
			dryer: faker.datatype.boolean(),
			AC: faker.datatype.boolean(),
			cableInstalled: faker.datatype.boolean(),
			wifiInstalled: faker.datatype.boolean(),
			walkInCloset: faker.datatype.boolean(),
			balcony: faker.datatype.boolean(),
			// Public amenities in boolean type
			gym: faker.datatype.boolean(),
			pool: faker.datatype.boolean(),
			elevator: faker.datatype.boolean(),
			lounge: faker.datatype.boolean(),
			mailRoom: faker.datatype.boolean(),
			//Pet friendly features in boolean type
			dogPark: faker.datatype.boolean(),
			petNumMax: faker.datatype.number(5),
			onlyCatDog: faker.datatype.boolean()
		});
	} catch (e) {
		console.log(e);
		await generateReviews(retries + 1)
	}

}
