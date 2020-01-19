const request = require('request');
const geocode = require('./geocode.js');

const address = process.argv[2];
const units = process.argv[3];


const getWeater = (moment = 'currently', units = 'ca') => {
    return (geoCode) => {
        const weaterUrl = `https://api.darksky.net/forecast/1728a4a04f31884ca9ce06ba9771a30d/${geoCode.latitude},${geoCode.longitude}?units=${units}&lang=pl`
        return new Promise((resolve, reject) => {
            request({
                url: weaterUrl,
                json: true
            }, (err, response) => {
                const weaterData = response.body[moment];
                const unitShortcut = determineUnits(units);
                resolve({
                    weaterData: weaterData,
                    unitShortcut: unitShortcut
                });
            });
        })
    }
}

const determineUnits = (units) => {
    switch (units) {
        case 'ca':
        case 'uk2':
            return '*C';
        case 'us':
            return '*F';
        default:
            console.log('Sorry, we are out of ' + units + '.');
            return '';
    }
}

geocode.getGeoCode(address)
    .then((getWeater('currently', units)))
    .then((data) => {
        console.log(`Realna temperatura: ${data.weaterData.temperature} ${data.unitShortcut}`);
        console.log(`Odczuwalna temperatura: ${data.weaterData.apparentTemperature} ${data.unitShortcut}`);
        console.log(`${data.weaterData.precipProbability}% szansy na deszcz`);
    })
    .catch((error) => {
        console.log(error);
    });




