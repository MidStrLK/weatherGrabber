/**
 * Created by eds on 05.12.2017.
 */
const cheerio  	= require("cheerio");
const utf8     	= require('utf8');
const prepare = require('../shared/prepare');

/* НАХОДИМ ЕДИНИЧНУЮ ТЕМПЕРАТУРУ */
module['exports'].findOneTemp = function(body, css) {
    let result = findOne(body, css);

    return prepare.temp(result);
};

/* НАХОДИМ ЕДИНИЧНУЮ ПОДПИСЬ */
module['exports'].findOneText = function(body, css) {
    let result = findOne(body, css);

    return prepare.text(result);
};


/* ИЩЕМ ТЕГ В BODY */
function findOne(body, css) {
    const $ = cheerio.load(body);

    let result = null;

    $(css)['each'](function () {
        let link = $(this);
        result = link.text();
    });

    return result;
}