const getsettings = require('../shared/getsettings');
const findmany = require('../shared/findmany');
const prepare = require('../shared/prepare');
const http = require('../shared/http');
let settingsLength = 0;
let responseCount = 0;
let responseArray = [];
let callback = null;

/* ОБНУЛЯЕМ ПАРАМЕТРЫ И ЗАПУСКАЕМ ПОИСК ПОГОДЫ */
module['exports'] = function(func) {
    const actualSettings = getsettings.getForecastSettings();

    responseArray = [];
    responseCount = 0;
    settingsLength = actualSettings.length;
    callback = func;

    actualSettings.forEach( settingsArray => {
        http.get(settingsArray, prepareBody)
    });

};

/* ЗАПУСКАЕМ ПОИСК ЗНАЧЕНИЙ */
function prepareBody(data, body, error){
    if(error){
        afterPrepare(data);
    }else{
        const temps = findmany.findManyTemp(body, data.temp);
        const texts = findmany.findManyText(body, data.text);
        const times = findmany.findManyTime(body, data.time);

        afterPrepare(data, temps, texts, times);
    }
}

/* ФОРМИРУЕМ ОТВЕТ ДЛЯ ОДНОГО */
function afterPrepare(data, temp, text, time){
    summary(prepare.forResponse({
        name:  data.name,
        label: data.label,
        temp:  temp,
        text:  text,
        time:  time,
        onlyOdd: data.onlyOdd
    }))
}

/* СОБИРАЕМ ОТВЕТЫ ВМЕСТЕ И ОТПРАВЛЯЕМ НАЗАД */
function summary(data){
    responseArray.push(data);
    responseCount++;

    if(responseCount === settingsLength){
        callback(responseArray);
    }
}