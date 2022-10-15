/**
 * Created by jovialis (Dylan Hanson) on 3/1/22.
 */

const config = require('dotenv').config();
console.log(config);

const nashvilleZipCodes = ("37013\n" +
  "37027\n" +
  "37072\n" +
  "37076\n" +
  "37115\n" +
  "37138\n" +
  "37201\n" +
  "37203\n" +
  "37204\n" +
  "37205\n" +
  "37206\n" +
  "37207\n" +
  "37208\n" +
  "37209\n" +
  "37210\n" +
  "37211\n" +
  "37212\n" +
  "37214\n" +
  "37215\n" +
  "37216\n" +
  "37217\n" +
  "37218\n" +
  "37219\n" +
  "37220\n" +
  "37221").split('\n');

const yelpAPI = require('yelp-fusion');
const client = yelpAPI.client(process.env.YELP_API_KEY);

async function searchZIPApartments(zip, curPage=0, limit=50) {
  let tryAgain = true;
  let searchResults;
  while (tryAgain) {
    try {
      searchResults = await client.search({
        location: "united states zip " + zip,
        categories: "apartments",
        offset: 50 * curPage,
        limit: limit,
        radius: 16000
      });
      tryAgain = false;
    } catch (e) {
      if (e.message.startsWith('LOCATION_NOT_FOUND')) {
        console.log('No apartments found')
        return [];
      } else {
        console.log(e);
      }
    }
  }

  const res = searchResults.jsonBody.businesses;
  const totalBusinesses = Math.min(1000, searchResults.jsonBody.total);

  console.log(`Finished ${zip} Page ${curPage + 1}/${Math.ceil(totalBusinesses/50)} (${totalBusinesses} Total)`);

  if ((curPage + 1) * 50 < totalBusinesses) {
    return [
      ...res,
      ...await searchZIPApartments(zip, curPage + 1, Math.min(50, totalBusinesses - (50 * (curPage + 1))))
    ]
  }

  return res;
}

const fs = require('fs');

(async function() {
  let allApartments = [];

  for (const zip of nashvilleZipCodes) {
    const res = await searchZIPApartments(zip);
    allApartments.push(...res);
  }

  function onlyUnique(value, index, array) {
    return array.findIndex(v => v.id === value.id) === index;
  }

  const uniqueApartments = allApartments.filter(onlyUnique);

  console.log(`Found ${allApartments.length} Apartments (${uniqueApartments.length} Unique)`);

  fs.writeFileSync('./nashville_apartments_yelp.json', JSON.stringify(uniqueApartments), 'utf8');
})();
