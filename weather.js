const weather = document.querySelector(".js-weather");
const API_KEY = "3818ef25d3d467105791bca356773349";
const COORDS = 'coords'; 

function getWeather(lat,lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        )
        .then(function(response){
            return response.json()
        })
        .then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`
        });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
};

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // key와 value 변수명이 같음
    const coordsObj = {
        latitude,
        longitude
    };
    console.log(coordsObj);
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
};

function handleGeoError(){
    console.log("Can not access geo location");
};

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
};


function loadCoords(){
    const loadedcoords = localStorage.getItem(COORDS);
    if(loadedcoords === null){
        askForCoords();
    }else{
        //getWeather
        const parseCoords = JSON.parse(loadedcoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
};

function init(){
    loadCoords();
}

init();








