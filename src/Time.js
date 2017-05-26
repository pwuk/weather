import React, { Component } from 'react';
import Constants from './Constants';


export default class extends Component {

	render() {

		return (
			<div className="data-time">
				<p className="time">{this.props.data.dt_txt.slice ( 11, 16 )}</p>
				{this.getTemp ( this.props.data, this.props.units )}
				{this.getWeather ( this.props.data )}
				{this.getClouds ( this.props.data )}
				{this.getWind ( this.props.data, this.props.units )}
				{this.getRain ( this.props.data )}
			</div>
		);

	}

	getTemp(obj, units) {
		let temperature = Constants[this.props.units + '_UNICODE'];
		return (
			<p className="temp">
				<em className="min">{Math.round(obj.main.temp_min)}{temperature}</em>
				<em className="current">{Math.round(obj.main.temp)}{temperature}</em>
				<em className="max">{Math.round(obj.main.temp_max)}{temperature}</em>
			</p>
		);
	}


	getWeather(obj) {
		return (
			<p className="weather">
				<em className="desc">{obj.weather[0].description}</em>
			</p>
		);
	}

	getClouds(obj) {
		let value = <div />;
		if(obj.clouds.all) {
			value = (
				<p className="clouds">
					<em className="clouds">Clouds: {obj.clouds.all}%</em>
				</p>
			);
		}
		return value;
	}


	getWind(obj) {
		let speed = Constants[this.props.units + '_SPEED'];
		return (
			<p className="wind">
				<em className="wind">Wind: {Math.round(obj.wind.speed)}{speed}</em>
			</p>
		);
	}

	getRain(obj) {
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
	}

}