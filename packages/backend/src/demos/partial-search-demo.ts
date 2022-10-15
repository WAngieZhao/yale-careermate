/**
 * Created by jovialis (Dylan Hanson) on 3/18/22.
 */


import {buildingModel} from "../graphql/models/buildingModel.js";

export function partialMatch(query: string) {
	const results = buildingModel.aggregate([
		{
			'$addFields': {
				'search_query': {
					'$concat': [
						'$buildingName', ' ', '$buildingAddress'
					]
				}
			}
		}, {
			'$match': {
				'search_query': {
					'$regex': new RegExp(query, 'i')
				}
			}
		}
	]);

	/*return *//*results.map(b => ({
		...b,
		search_query: undefined
	}));*/
}
