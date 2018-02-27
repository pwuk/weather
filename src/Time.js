import React from 'react';
import Constants from './Constants';

const getTemp = (obj, units) => {
    let temperature = Constants[units + '_UNICODE'];
    return (
        <p className="temp">
            <em className="min">{Math.round(obj.main.temp_min)}{temperature}</em>
            <em className="current">{Math.round(obj.main.temp)}{temperature}</em>
            <em className="max">{Math.round(obj.main.temp_max)}{temperature}</em>
        </p>
    );
};

const getWeather = (obj) => (
    <p className="weather">
        <img role="presentation" src={"http://openweathermap.org/img/w/" + obj.weather[0].icon + ".png"} />
        <em className="desc">{obj.weather[0].description}</em>
    </p>
);



const getClouds = (obj) => {
    let value = <div />;
    if(obj.clouds.all) {
            value = (
				<p className="clouds">
					<em className="clouds">Clouds: {obj.clouds.all}%</em>
				</p>
			);
    }
    return value;
};

const getWind = (obj, units) => {
	let speed = Constants[units + '_SPEED'];
	return (
		<p className="wind">
			<em className="wind">Wind: {Math.round(obj.wind.speed)}{speed}</em>
		</p>
	);
};

const getRain = (obj) => {
    let value = <div />;
    if(obj.rain && obj.rain['3h']) {
            let rain = Math.round(Math.round(obj.rain['3h']*100)/100);
            if(rain) {
                value = (
					<p className="rain">
						<em className="wind">3h Rain: {rain}</em>
					</p>
				);
            }
        }
    return value;

};

export default (props) => (
    <div className="data-time">
        <div className="time-inner">
            <p className="time">{props.data.dt_txt.slice ( 11, 16 )}</p>
            {getTemp ( props.data, props.units )}
            {getWeather ( props.data )}
            {getClouds ( props.data )}
            {getWind ( props.data, props.units )}
            {getRain ( props.data )}
        </div>
    </div>
)
