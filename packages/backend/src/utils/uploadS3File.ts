/**
 * Created by jovialis (Dylan Hanson) on 4/22/22.
 */

import AWS from "aws-sdk";
import {nanoid} from "nanoid";
import stream from "stream";
import {config} from "../config.js";

export default async function uploadS3File(createReadStream, mimetype): Promise<AWS.S3.ManagedUpload.SendData> {
	const readStream = createReadStream();

	const s3 = new AWS.S3({
		accessKeyId: config.S3_KEY,
		secretAccessKey: config.S3_SECRET
	});

	const id = nanoid();

	const writeStream = new stream.PassThrough();
	const promise = s3.upload({
		Bucket: config.S3_BUCKET,
		Key: `public/${id}`,
		Body: writeStream,
		ContentType: mimetype
	}).promise();

	readStream.pipe(writeStream);
	return await promise;
}
