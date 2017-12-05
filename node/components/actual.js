const getsettings = require('../shared/getsettings');
const findone = require('../shared/findone');
const http = require('../shared/http');
let settingsLength = 0;
let responseCount = 0;
let responseArray = [];
let callback = null;

/* ОБНУЛЯЕМ ПАРАМЕТРЫ И ЗАПУСКАЕМ ПОИСК ПОГОДЫ */
module['exports'] = function(func) {
    const actualSettings = getsettings.getActualSettings();

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
        const temp = findone.findOneTemp(body, data.temp);
        const text = findone.findOneText(body, data.text);

        afterPrepare(data, temp, text);
    }
}

/* ФОРМИРУЕМ ОТВЕТ ДЛЯ ОДНОГО */
function afterPrepare(data, temp, text){
    summary({
        name:  data.name,
        label: data.label,
        temp:  temp,
        text:  text
    })
}

/* СОБИРАЕМ ОТВЕТЫ ВМЕСТЕ И ОТПРАВЛЯЕМ НАЗАД */
function summary(data){
    responseArray.push(data);
    responseCount++;

    if(responseCount === settingsLength){
        callback(responseArray);
    }
}