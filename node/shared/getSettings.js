/**
 * Created by eds on 05.12.2017.
 */
const manifest  = require('../../manifest');

/* ПОЛУЧАЕМ НАСТРОЙКИ ДЛЯ АКТУАЛЬНОЙ ПОГОДЫ */
module['exports'].getActualSettings = function() {
    return manifest.actual;
};

/* ПОЛУЧАЕМ НАСТРОЙКИ ДЛЯ ПОЧАСОВОЙ ПОГОДЫ */
module['exports'].getHourlySettings = function() {
    return manifest.hourly;
};

/* ПОЛУЧАЕМ НАСТРОЙКИ ДЛЯ ПРОГНОЗА ПОГОДЫ */
module['exports'].getForecastSettings = function() {
    return manifest.forecast;
};