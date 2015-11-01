export function selectWeatherNamespace(state) {
    return state.weather;
}

export function selectQuery(state) {
    return selectWeatherNamespace(state).query;
}

export function selectTemperature(state) {
    const weatherData = selectWeatherNamespace(state).weather;

    return weatherData ? weatherData.main.temp : null;
}
