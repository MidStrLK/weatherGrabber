/**
 * Created by eds on 04.12.2017.
 */

const request = require("request");

module['exports'].get = function(data, callback) {
    request({
        uri: data.url
    }, function(error, response, body){
        callback(data, body, error)
    });
};
