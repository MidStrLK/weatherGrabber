const getsettings = require('../shared/getsettings');
const findmany = require('../shared/findmany');
const prepare = require('../shared/prepare');
const http = require('../shared/http');
let settingsLength = 0;
let responseCount = 0;
let responseArray = [];
let callback = null;

/* ОБНУЛЯЕМ ПАРАМЕТРЫ И ЗАПУСКАЕМ ПОИСК ПОГОДЫ */
module['exports'] = function(func, time) {
    const hourlySettings = getsettings.getHourlySettings();

    responseArray = [];
    responseCount = 0;
    settingsLength = hourlySettings.length;
    callback = func;

    hourlySettings.forEach( settingsArray => {
        settingsArray.currentTime = time;
        http.get(settingsArray, prepareBody)
    });

};

/* ЗАПУСКАЕМ ПОИСК ЗНАЧЕНИЙ */
function prepareBody(data, body, error){
    if(error){
        afterPrepare(data);
    }else{
        const temps = findmany.findManyTemp(body, data.temp, data['tempCut']);
        const texts = findmany.findManyText(body, data.text, data['textCut']);
        const times = findmany.findManyTime(body, data.time, data['timeCut']);

        afterPrepare(data, temps, texts, times);
    }
}

/* ФОРМИРУЕМ ОТВЕТ ДЛЯ ОДНОГО */
function afterPrepare(data, temp, text, time){
    const prepareForResponse = prepare.forResponse({
        name:  data.name,
        label: data.label,
        temp:  temp,
        text:  text,
        time:  time,
        currentTime: data.currentTime,
        isDayTime: Boolean(data.time === 'dayTime'),
        actualWeather: data.actualWeather
    });

    const cutOutOfTime = prepare.cutOutOfTime(prepareForResponse);

    summary(cutOutOfTime)
}

/* СОБИРАЕМ ОТВЕТЫ ВМЕСТЕ И ОТПРАВЛЯЕМ НАЗАД */
function summary(data){
    responseArray.push(data);
    responseCount++;

    if(responseCount === settingsLength){
        callback(responseArray);
    }
}
