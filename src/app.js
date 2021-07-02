const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode')

// console.log(__dirname)
// console.log(__filename)

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // This is default views directory
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

/* app.get('/', (req, res) => {
    res.send('Hello express!')
})

app.get('/help', (req, res) => {
    res.send('Help page')
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
})

app.get('/weather', (req, res) => {
    res.send({
        forecase: 'It is showing',
        location: 'Philadelphia'
    })
}) */

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Balaji'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Balaji'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is help text',
        title: 'Help',
        name: 'Balaji'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            //return console.log(error);
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forcastData) => {
            if (error) {
                //return console.log(error);
                return res.send({ error })
            }
            res.send({
                forecast: forcastData,
                location: location,
                address: req.query.address
            })
            //console.log(location);
            //console.log(forcastData)
        })
    })


    /* console.log(req.query.address)
    res.send({
        forecase: 'It is showing',
        location: 'Philadelphia',
        address: req.query.address
    }) */

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('404', {
        title: 'Error 404',
        name: 'Balaji',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    //res.send('My 404 page')
    res.render('404', {
        title: 'Error 404',
        name: 'Balaji',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is running in port 3000.')
})