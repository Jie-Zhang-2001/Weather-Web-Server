const path = require('path');
const express = require('express');
const hbs = require('hbs');
const utils = require('./utils');

//Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views');
const public = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

// Setup static directory to serve
app.use(express.static(public))

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jie'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jie Zhang',
        age: 19
    })
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        help: 'Help Message',
        name: 'Zhang Jie',
        contact: 3476517406
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please specify an address!'
        });
    }
    utils.geocode(req.query.address, (error, { Lat, Lon, Location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        utils.forecast(Lon, Lat, (error, forecast) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecast,
                location: Location,
                address: req.query
            });
        })
    });

})

// app.get('/products', (req, res) => {
//     res.send('PRODUCT PAGE');
//     console.log(req.query);
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        errorMessage: 'Help Article Not Found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        errorMessage: '404 Not Found'
    })
});
app.listen(3000, () => {
    console.log('Server started')
});
