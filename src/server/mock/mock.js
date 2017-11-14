const nock = require('nock');

const normalDelay = 1000;

nock('http://localhost:8080')
    .persist()
    .get('/health')
    .delay(normalDelay)
    .reply(200, require('./health.json'));