const actual    = require('../components/actual');
const hourly    = require('../components/hourly');
const forecast  = require('../components/forecast');

module.exports = function(app) {

    app.get('/api/actual',   (req, res) => {
        let func = function (cat) {
            res.send(cat)
        };

        actual(func);
    });

    app.get('/api/hourly',   (req, res) => {
        let func = function (cat) {
            res.send(cat)
        };

        hourly(func, req.query.time);
    });

    app.get('/api/forecast', (req, res) => {
        let func = function (cat) {
            res.send(cat)
        };

        forecast(func);
    });

};