const geocode = require('./src/geocode.js');
const weather = require('./src/weather.js');
const express = require('express');
const path = require('path');

const publicDirectory = './public';
const viewsDirectory = './templates';


const app = express()
const port = process.env.PORT || 3000 //for Heroku

app.set('view engine', 'pug')
app.set('views', viewsDirectory)

app.use(express.static(publicDirectory))

app.get('/', function (req, res) {

    return res.render('views/index', { title: 'Weather' })
});


app.get('/weather', function (req, res) {
    const address = req.query.address;
    const units = req.query.units || 'ca';
    if (!address) {
        return res.send({
            error: "Query must contain the address"
        });
    }
    geocode.getGeoCode(address)
        .then((weather.getWeater('currently', units)))
        .then((data) => {
            const { weaterData, unitsShortcut } = data;

            return res.send({
                weaterData,
                unitsShortcut,
                address
            });
        })
        .catch((error) => {
            return res.send({
                error
            });
        });

});

app.get('/about', function (req, res) {
    return res.render('views/about', { title: 'About' })
});

app.get('/help', function (req, res) {
    return res.render('views/help', { title: 'Help' })
});

app.listen(port, () => {
    console.log("Server is up on port " + port);
});




