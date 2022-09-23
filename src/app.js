const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3600

// Define Paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewDirPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewDirPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: 'Krishnakant'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Krishnakant"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address not found"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide search term"
        })
    }

    res.send({
        products: []
    })
})

app.get('/about/*', (req, res) => {
    res.render('error', {
        title: 404,
        errorMessage: 'About has no page'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 404,
        errorMessage: 'Not Found'
    })
})

// app.get('', (req, res) => {
//     res.send('Hello World')
// })
//
// app.get('/help', (req, res) => {
//     res.send('Help Page')
// })
//
// app.get('/about', (req, res) => {
//     res.send('About')
// })
//
// app.get('/weather', (req, res) => {
//     res.send('Your Weather')
// })

app.listen(port, () => {
    console.log("server is up on port " + port)
})