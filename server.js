const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
//const telegrambot    = require('./node/bot/telegrambot.js');
const port           = require('./node/shared/settings').port;
const server_port           = port || 8080;
const server_ip_address     = '127.0.0.1';

app.use(bodyParser.urlencoded({ extended: true }));

console.log(server_port, server_ip_address);

require('./node/routes')(app, {});

app.listen(server_port, server_ip_address, () => {
    console.log( "Listening on " + server_ip_address + ", port " + server_port );
    //telegrambot.start();
});

