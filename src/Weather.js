import React from 'react';
import UnitSelector from './UnitSelector';
import LocationSelector from './LocationSelector';
import Day from './Day';


export default (props) => (
	<div className="weather-widget">
		<UnitSelector
			selectionChange={(units)=>{props.setUnits(units)}}
			defaultSelection={props.units}
		/>
		<LocationSelector
			selectionChange={(cityId)=>{props.selectCity(cityId)}}
			defaultSelection={props.cityData.id}
		/>
		<div>
			{props.weatherData.map(
				(dateObj) => <Day key={dateObj.day} data={dateObj} units={props.units} />
			)}
		</div>
	</div>
);