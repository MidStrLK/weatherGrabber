/**
 * Created by eds on 05.12.2017.
 */
const cheerio  	= require("cheerio");
const utf8     	= require('utf8');
const dayTime 	= require('./settings').dayTime;
const prepare   = require('./prepare');

/* НАХОДИМ ПРОГНОЗ ТЕМПЕРАТУР */
module['exports'].findManyTemp = function(body, css, tempCut) {
    let result = findMany(body, css);

    result = prepare.tempArray(result, tempCut);

    return result;
};

/* НАХОДИМ ПРОГНОЗ ПОДПИСЕЙ */
module['exports'].findManyText = function(body, css) {
    let result = findMany(body, css);

    result = prepare.textArray(result);

    return result;
};

/* НАХОДИМ ПРОГНОЗ ПОДПИСЕЙ */
module['exports'].findManyTime = function(body, css) {
    let result = dayTime;

    if(css !== 'dayTime'){
        result = findMany(body, css);
    }

    result = prepare.timeArray(result);

    return result;
};


/* ИЩЕМ ТЕГИ В BODY */
function findMany(body, css) {
    const $ = cheerio.load(body);
    let result = [];

    $(css)['each'](function () {
        let link = $(this);
        let text = link.text();

        if(!text && link[0] && link[0]['attribs'] && link[0]['attribs']['data-text']){
            text = link[0]['attribs']['data-text']
        }

        result.push(text);
    });

    return result;
}