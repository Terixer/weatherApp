const request = require('request');

const getGeoCode = (city = "Warsaw") => {
    const encodeURICity = encodeURIComponent(city);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURICity}.json?access_token=pk.eyJ1IjoieWlkYWJvODI5MiIsImEiOiJjazVsOHVyY2wwa3M1M2twY2I2NWI4c3B4In0.nrsu8Z4zBPhKhdk2gndAFQ&limit=1`
    const geoCode = {};
    return new Promise((resolve, reject) => {
        request({
            url: url,
            json: true
        }, (error, { body: data }) => {
            if (error) {
                reject("Problem with conneciton with geomap api");
            } else if (data.features.length === 0) {
                reject("Unable to find city");
            } else {
                geoCode.latitude = data.features[0].center[1];
                geoCode.longitude = data.features[0].center[0];
                resolve(geoCode);
            }
        });
    });
};

module.exports = {
    getGeoCode
}