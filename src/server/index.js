const express = require('express')
const exphbs  = require('express-handlebars');
const request = require('request-promise-native');
const bodyParser = require('body-parser');

const USE_MOCKS = process.env.USE_MOCKS === '1';
const PORT = process.env.PORT || 3000;

USE_MOCKS && require('./mock/mock');

let app = express();

// set Handlebars as default view engine
app.engine('.hbs', exphbs({
    extname: '.hbs',
    layoutsDir: 'src/server/views/',
    defaultLayout: 'layout'
}));

app.set('view engine', '.hbs');
app.set('views', 'src/server/views/');

// Serve static
app.use('/assets', express.static('.build/assets'));

// Parse request body
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Healthcheck
app.get('/health', function (req, res) {
   const options = {
       method: 'GET',
       uri: 'http://localhost:8080/health'
   };

   request(options)
       .then(response => {
            res.send(response);
        })
       .catch(err => {
           res.send(err);
        })
});

// Index page
app.get('/', function (req, res) {
    const options = {
        method: 'GET',
        uri: 'http://localhost:8080/management/feature'
    };

    request(options)
        .then(response => {
            res.render('home', {
                title: 'Feature toggle UI',
                features: JSON.parse(response)
            });
        })
        .catch(err => {
            res.status(500).send(err);
        })
});

app.post('/', function (req, res) {
    let formData = req.body;

    const options = {
        method: 'POST',
        uri: 'http://localhost:8080/management/feature',
        body: {
            id: null,
            filters: [],
            name: formData.name,
            description: formData.description,
            enable: !!formData.enable
        },
        json: true
    };

    request(options)
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            res.send(err);
        })
});

app.listen(PORT, () => {
    console.log('🎉  Hoooray! Express is listening on http://localhost:' + PORT);
});
