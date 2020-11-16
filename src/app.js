const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('postman-request');

const app = express();
const port = process.env.PORT || 3000

const weatherUrl = 'http://api.weatherstack.com/current?access_key=5b8c6bea57e7891a50574748f4964a8d&query='

// Define paths for Express config
const pubDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);
app.set('views', viewsPath);

// Set up static directory to serve
app.use(express.static(pubDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Great Wahooney'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Great Wahooney'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMsg: 'Please send help, I\'m stuck on this crappy server!',
        name: 'Great Wahooney'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'Specify a location, you doofus!'
        })
    }
    request({ url: weatherUrl + req.query.location, json: true }, (error, response) => {
        if (response.body.error) {
            return res.send({
                error: 'Are you sure that\'s a real place?'
            }
                )
        }
        res.send(response.body)
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        errorMessage: 'This help article hasn\'t been written yet.',
        name: 'Great Wahooney'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        errorMessage: 'It appears that you are lost. Consider using the navigation bar above.',
        name: 'Great Wahooney'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port +'.')}
)