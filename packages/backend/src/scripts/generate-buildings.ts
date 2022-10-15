/**
 * Created by jovialis (Dylan Hanson) on 3/18/22.
 */

import {config as loadDotEnv} from "dotenv";
import mongoose from "mongoose";
import {config} from "../config.js";

import {buildingModel} from "../graphql/models/buildingModel.js";
import {faker} from "@faker-js/faker";

const GENERATE_COUNT = 500;

(async function () {

	loadDotEnv();
	await mongoose.connect(config.MONGODB_URL);

	for (let i = 0 ; i < GENERATE_COUNT ; i++) {
		if (i % 25 === 0) console.log(`Generating building ${i}`);
		await generateBuilding();
	}

})().then(() => {
	process.exit()
});

async function generateBuilding(retries = 0) {
	if (retries > 5) {
		return;
	}

	try {
		await buildingModel.create({
			buildingName: faker.company.companyName(),
			buildingAddress: faker.address.streetAddress(),
			buildingCity: faker.address.city(),
			buildingState: faker.address.state(),
			photos: Array.from(Array(Math.floor(Math.random() * 6)).keys()).map(() => "https://placeimg.com/640/480/arch"),
			totalScore: faker.datatype.number(500),
			envScore: faker.datatype.number(500),
			secScore: faker.datatype.number(500),
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
		await generateBuilding(retries + 1);
	}

}
