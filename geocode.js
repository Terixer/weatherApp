const request = require('request');

const getGeoCode = (city) => {
    const encodeURICity = encodeURIComponent(city);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURICity}.json?access_token=pk.eyJ1IjoieWlkYWJvODI5MiIsImEiOiJjazVsOHVyY2wwa3M1M2twY2I2NWI4c3B4In0.nrsu8Z4zBPhKhdk2gndAFQ&limit=1`
    const geoCode = {
        latitude: 0,
        longitude: 0
    }
    return new Promise((resolve, reject) => {
        request({
            url: url,
            json: true
        }, (error, response) => {
            if (error) {
                reject("Problem with conneciton with geomap api");
            } else if (response.body.features.length === 0) {
                reject("Unable to find city");
            } else {
                geoCode.latitude = response.body.features[0].center[1];
                geoCode.longitude = response.body.features[0].center[0];
                resolve(geoCode);
            }
        });
    });
};

module.exports = {
    getGeoCode: getGeoCode
}