import React, { Component } from 'react';
import UnitSelector from './UnitSelector';
import loadWeatherData from './DataAPI';
import Day from './Day';

export default class extends Component {

	constructor() {
		super();

		this.state = {
			units       : 'metric',
			weatherData : [],
			loading     : true
		}

	}

	render() {
		let widget;
		if(this.state.loading) {
			widget= (
				<div className="loading">
					<img src="loading.gif" role="presentation"/>
				</div>
			);
		}
		else {
			widget = (
				<div className="weather-widget">
					<UnitSelector  selectionChange={(units)=>{this.unitChangeHandler(units)}}/>
					<div>
						{
							this.state.weatherData.map( (dateObj)  => {
								return <Day key={dateObj.day} data={dateObj} units={this.state.units} />;
							} )
						}
					</div>
				</div>
			);

		}

		return (<div>{widget}</div>);
	}

	componentDidMount() {
		loadWeatherData(this.state.units, (data) => {this.getWeatherData(data) } );
	}

	unitChangeHandler(units) {
		this.setState(
			{units},
			() => {
				loadWeatherData(this.state.units, (data) => {this.getWeatherData(data) })
			}
		) ;

	}


	getWeatherData(weatherData) {
		this.setState( {
			loading: false,
			weatherData: this.transformWeatherData(weatherData)
		} );
	}

	/**
	 * transform data from weather service into format consumable by UI
	 *
	 * @param rawData
	 * @returns array[{
	 *              date:'',
	 *              times[{}]
	 *          ]
	 */
	transformWeatherData( rawData ) {

		return rawData.list.reduce( (acc, data) => {
				let dateKey = data.dt_txt.slice(0,10);
				if(!acc[0].hasOwnProperty(dateKey)) {
					acc[0][dateKey] = []
				}
				acc[0][dateKey].push(data);
				return acc
			}, [{}])
			.reduce( (acc, obj) => {
				Object.keys(obj).forEach((key) => {acc.push({day:key, times:obj[key]})});
				return acc;
			}, []);

	}

}