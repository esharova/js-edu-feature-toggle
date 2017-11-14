const express = require('express')
const exphbs  = require('express-handlebars');
const request = require('request-promise-native');

const USE_MOCKS = process.env.USE_MOCKS === '1';
const PORT = process.env.PORT || 3000;

const FEATURES_API_HOST = process.env.FEATURES_API_HOST || 'localhost';
const FEATURES_API_PORT = process.env.FEATURES_API_PORT || '8080';

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

// Healthcheck
app.get('/health', function (req, res) {
   request.get('http://localhost:8080/health', (error, response, body) => {
       if (error) {
           res.send(error);
           return;
       }

       res.send(body);
   })
});

// Index page
app.get('/', function (req, res) {
   request.get('http://localhost:8080/health', (error, response, body) => {
       if (error) {
           res.status(500).send('Error');
           return;
       }

       res.render('home', {
           title: 'Feature toggle UI'
       });
   });
});

app.listen(PORT, () => {
    console.log('🎉  Hoooray! Express is listening on http://localhost:' + PORT);
});
