const ENDPOINT = 'http://api.openweathermap.org/data/2.5/weather?q=Reykjavik&appid={insert-your-token-here}&units=metric';

const weatherService = () => {
    return {
        getCurrentDegree: () => fetch(ENDPOINT).then(d => d.json()).then(d => d.main.temp)
    };
};

export default weatherService();
