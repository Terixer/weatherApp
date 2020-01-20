const request = require('request');

const getWeater = (moment = 'currently', units = 'ca') => {
    return ({ latitude, longitude }) => {
        const weaterUrl = `https://api.darksky.net/forecast/1728a4a04f31884ca9ce06ba9771a30d/${latitude},${longitude}?units=${units}&lang=pl`
        return new Promise((resolve, reject) => {
            request({
                url: weaterUrl,
                json: true
            }, (err, { body: data }) => {
                if (err) {
                    reject("Cannot connect to the server");
                }
                try {
                    const weaterData = data[moment];
                    const unitsShortcut = determineUnits(units);
                    resolve({
                        weaterData,
                        unitsShortcut
                    });
                } catch (e) {
                    reject(e);
                }
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
            throw 'We have no support for' + units + ' unit.';
    }
}

module.exports = {
    getWeater
}