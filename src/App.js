import React, { Component } from 'react';
import {connect} from 'react-redux';


import './App.css';
import Weather from './Weather';
import loadWeatherData from './DataAPI';
import Error from './Error';
import Loading from './Loading';

import getAsText from './TextFile';

class App extends Component {

    componentDidMount() {
        this.props.getWeatherData(this.props.cityData.id, this.props.units);

        getAsText('a.txt')
            .then((res) => console.log(res))
            .catch((err)=>console.log(err))

    }

    render() {
        let widget;

        if(this.props.loading) {
            widget =<Loading msg={'Requesting data ....'} />;
        }
        else if(this.props.error) {
            widget = <Error msg={this.props.errorData.message} />;
        }
        else {
            widget = <Weather
                weatherData={this.props.weatherData}
                cityData={this.props.cityData}
                selectCity={(city)=>this.props.selectCity(city) || this.props.getWeatherData(city, this.props.units)}
                setUnits={(units)=>this.props.setUnits(units) && this.props.getWeatherData(this.props.cityData.id, units)}
                units={this.props.units}
            />
        }

	  return (
	      <div className="App">
            <div className="App-header">
              <h2>Five Day Weather Data {this.props.someThing}</h2>
              <h3>{this.props.cityData.name}, {this.props.cityData.country}</h3>
            </div>
              {widget}
	      </div>
	  );
  }
}

function mapStateToProps(state) {
    return {
        cityData: state.cityData,
        units: state.units,
        loading: state.loading,
        error: state.error,
        someThing: state.string,
        weatherData: state.weatherData,
        errorData: state.errorData
    }
}

function getWeatherData(city, units, dispatch) {
        loadWeatherData(units, city)
            .then(
                (data) => {
                    dispatch({type:'SET_WEATHER_DATA', data})
                    dispatch({type:'SET_CITY', data} )
                }
            )
            .catch((data) => {dispatch({type:'SET_ERROR', data})});
}

function mapDispatchToProps(dispatch) {
    return {
        selectCity: (city)=>{dispatch({type:'SELECT_CITY', city }) },
        setUnits: (units)=>dispatch({type:'SET_UNITS', units }),
        setWeatherData: (data)=>dispatch({type:'SET_WEATHER_DATA', data}),
        getWeatherData: (city, units)=>getWeatherData(city, units, dispatch),
        errorHandler: (data)=>dispatch({type:'SET_ERROR', data})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
