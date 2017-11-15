const express = require('express')
const exphbs  = require('express-handlebars');
const request = require('request-promise-native');
const url = require('url');
const bodyParser = require('body-parser');

const USE_MOCKS = process.env.USE_MOCKS === '1';
const PORT = process.env.PORT || 3000;

const FEATURES_API_HOST = process.env.FEATURES_API_HOST || 'localhost';
const FEATURES_API_PORT = process.env.FEATURES_API_PORT || '8080';

const FEATURES_API_ENDPOINT = url.format({
    protocol: 'http',
    hostname: FEATURES_API_HOST,
    port: FEATURES_API_PORT
});

USE_MOCKS && require('./mock/mock');

let app = express();

// set Handlebars as default view engine
app.engine('.hbs', exphbs({
    extname: '.hbs',
    layoutsDir: 'src/server/views/',
    partialsDir: 'src/server/views/partials',
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
    request
        .get(`${FEATURES_API_ENDPOINT}/management/feature`)
        .then((body) => {
            return res.render('home', {
                title: 'Feature toggle UI',
                features: JSON.parse(body)
            });
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

// Add feature
app.post('/', function (req, res) {
    let formdata = req.body;

    request
        .post(`${FEATURES_API_ENDPOINT}/management/feature`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                id : null,
                filters : [],
                name: formdata.name,
                description: formdata.description,
                enable: !!formdata.enable
            },
            json: true
        })
         .then(() => {
             res.redirect('/');
         })
         .catch((error) => {
             res.status(500).send(error);
         });
});

app.listen(PORT, () => {
    console.log('🎉  Hoooray! Express is listening on http://localhost:' + PORT);
});
