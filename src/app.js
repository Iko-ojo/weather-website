const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and view location
app.set('view engine','hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abraham John'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Abraham John'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abraham John',
        message: 'This is the help message'
    })
})



app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'An address Must be provided'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error){
            return res.send({ error })
        }

        forecast(data.latitude, data.longitude, (error,forecastData) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search team'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abraham John',
        error: 'Help article not found'
    });
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Abraham John',
        error: 'My 404 page'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})