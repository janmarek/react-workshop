import config from '../config';
import $ from 'jquery';

export const SEARCH = 'WEATHER_SEARCH';
export const SAVE_DATA = 'WEATHER_SAVE_DATA';

export function search(query) {
    return {
        type: SEARCH,
        query,
    };
}

export function submitSearch() {
    return (dispatch, getState) => {
        const state = getState();
        const query = state.weather.query;

        const url = config.apiUrl +
            '/weather?q=' + query +
            '&appid=' + config.apiKey +
            '&units=metric';

        $.getJSON(url, (data) => {
            dispatch(saveData((data)));
        });
    };
}

export function saveData(data) {
    return {
        type: SAVE_DATA,
        data,
    };
}
