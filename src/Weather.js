import React, { Component } from 'react';
import UnitSelector from './UnitSelector';
import LocationSelector from './LocationSelector';
import loadWeatherData from './DataAPI';
import Day from './Day';
import Error from './Error';

export default class extends Component {

	constructor() {
		super();

		this.state = {
			units       : 'metric',
			weatherData : [],
			cityId		: 2643743,
			locationName: '',
			loading     : true,
			error		: false
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
		else if(this.state.error) {
			widget = (<Error msg={this.state.errorData} />);
		}
		else {
			widget = (
				<div className="weather-widget">
					<UnitSelector
						selectionChange={(units)=>{this.unitChangeHandler(units)}}
						defaultSelection={this.state.units}
					/>
					<LocationSelector
						selectionChange={(cityId)=>{this.cityChangeHandler(cityId)}}
						defaultSelection={this.state.cityId}
					/>
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
		loadWeatherData(this.state.units, this.state.cityId,
			(data) => {this.getWeatherData(data)}, 
			(data) => {this.handleError(data)} );
	}

	unitChangeHandler(units) {
		this.setState(
			{units},
			() => {
				loadWeatherData(this.state.units, this.state.cityId,
					(data) => {this.getWeatherData(data) }, 
					(data) => {this.handleError(data)} )
			}
		) ;

	}

    cityChangeHandler(cityId) {
        this.setState(
            {cityId},
            () => {
                loadWeatherData(this.state.units, this.state.cityId,
                    (data) => {this.getWeatherData(data) },
                    (data) => {this.handleError(data)} )
            }
        ) ;

    }


    handleError( error ) {
		debugger;
		this.setState( {
			loading: false,
			error: true,
			errorData: 'Cannot access the Weather Service'
		})
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