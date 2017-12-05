/**
 * Created by eds on 05.12.2017.
 */
const dayTime = require('./settings').dayTime;

/* ПОДГОТОВКА К ОТОБРАЖЕНИЮ НА САЙТЕ */
module['exports'].forResponse = function(data){
    const currentTime = data.currentTime;
    const actualWeather = data.actualWeather;
    const isDayTime = data.isDayTime;
    const onlyOdd = data.onlyOdd;

    // Заготовка
    let result = {
        name:  data.name,
        label: data.label,
        items: []
    };

    // если нужны только нечетные
    if(onlyOdd){
        let res = [];

        data.temp.forEach((val, key) => {
            if(key%2 !== 0) res.push(val);
        });

        data.temp = res;
    }

    // Преобразуем для отображения
    data.temp.forEach((val, key) => {

        // Есть время - разбиваем массив по времени
        if(data.time[key]){
            result.items[data.time[key]] = {
                temp: val,
                text: data.text[key]
            }
        }else {
            result.items.push({
                temp: val,
                text: data.text[key]
            })
        }
    });

    // если время = утро,день, вечер, ночь то обрезаем массив на 21:00
    if(isDayTime){
        result.items.length = dayTime[dayTime.length-1] + 1;
    }

    // Обрезаем под конкретное время, присланное пользователем
    if(currentTime && !actualWeather){
        result.items = result.items.slice(currentTime);
    }

    return result;
};

/* ПОДГОНКА ПО ВРЕМЕНИ */
module['exports'].cutOutOfTime = function(data){
    return data;
};



/* ГОТОВИМ МАССИВ ТЕМПЕРАТУР К ОТОБРАЖЕНИЮ */
module['exports'].tempArray = function(arr, tempCut){
    let result = [];

    arr = arr.map(val => val.replace(/−/g, '-'));

    arr.forEach(value => {
        if(!isNaN(parseInt(value)) && value !== '') result.push(this.temp(value))
    });

    if(tempCut) result = result.slice(tempCut);

    return result;
};

/* ГОТОВИМ МАССИВ ПОДПИСЕЙ К ОТОБРАЖЕНИЮ */
module['exports'].textArray = function(arr){
    let result = [];

    arr.forEach(value => {
        if(isNaN(parseInt(value))) result.push(this.text(value))
    });

    return result;
};

/* ГОТОВИМ МАССИВ ВРЕМЕН К ОТОБРАЖЕНИЮ */
module['exports'].timeArray = function(arr){
    let result = [];

    arr.forEach(value => {
        if(!isNaN(+value)) result.push(this.time(value))
    });

    return result;
};




/* ГОТОВИМ ТЕМПЕРАТУРУ К ОТОБРАЖЕНИЮ */
module['exports'].temp = function(temp){
    if(temp && temp.replace) temp = temp.replace(/\s/g, '');

    if(temp && temp.replace) temp = temp.replace(/°/g, '');

    return temp ? (temp + '°C') : '';
};

/* ГОТОВИМ ПОДПИСЬ К ОТОБРАЖЕНИЮ */
module['exports'].text = function(text){
    return text
};

/* ГОТОВИМ ВРЕМЯ К ОТОБРАЖЕНИЮ */
module['exports'].time = function(text){
    return text;
    //return String(text).replace(/\s/g, '')
};