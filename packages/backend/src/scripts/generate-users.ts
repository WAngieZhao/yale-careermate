/**
 * Created by jovialis (Dylan Hanson) on 3/18/22.
 */

import {config as loadDotEnv} from "dotenv";
import mongoose from "mongoose";
import {config} from "../config.js";

import {buildingModel} from "../graphql/models/buildingModel.js";
import {faker} from "@faker-js/faker";
import {userModel} from "../graphql/models/userModel.js";

const GENERATE_COUNT = 50;

(async function () {

	loadDotEnv();
	await mongoose.connect(config.MONGODB_URL);

	for (let i = 0 ; i < GENERATE_COUNT ; i++) {
		console.log(`Generating user ${i}`);
		await generateUsers();
	}

})().then(() => {
	process.exit()
});

async function generateUsers(retries = 0) {
	// Fail out after 5 retries.
	if (retries > 5) {
		return;
	}

	try {
		await userModel.create({
			userName: faker.word.adjective() + faker.word.noun(),
			email: faker.internet.email(),
			year: "2022"
		});
	} catch (e) {
		// try again
		await generateUsers(retries + 1);
	}

}
