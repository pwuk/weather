import React, { Component } from 'react';
import Constants from './Constants';
import Time from './Time';
import EmptyTime from './EmptyTime';


export default class extends Component {

	render() {

		let emptyTimes = new Array(Constants.TIME_PERIODS -  this.props.data.times.length);
		let emptyElements = emptyTimes.fill(0).map( (dummy, ndx) => {
			return <EmptyTime key={ndx} />
		});
		let missingDataPast = false;

		if(emptyTimes.length) {
			if(this.props.data.times[0].dt_txt.slice(11,16) !== '00:00') {
				missingDataPast = true;
			}
		}

		return (
			<div className="day">
				<div className="date">
					{this.getDate(this.props.data.day)}
					{this.getDaySummary(this.props.data.times)}
				</div>
				<div className="date-data">
					{missingDataPast ? emptyElements : null}
					{
						this.props.data.times.map( (time, ndx) => {
							return <Time key={ndx} data={time} units={this.props.units} />
						})
					}
					{missingDataPast ? null : emptyElements}
				</div>
			</div>
		);
	}

	getDate(date) {
		let dayOfWeek = new Date(date).getDay();
		return (
			<p className="day-name">
				{Constants.WEEK[dayOfWeek]}
			</p>
		);
	}

	getDaySummary(times) {

		let max = 0, min = Infinity;
		let temperature = Constants[this.props.units + '_UNICODE'];

		times.forEach( (time) => {
			min = Math.min(min, time.main.temp_min)
			max = Math.max(max, time.main.temp_max)
		});

		return (
			<div>
				<em className="min">Min: {Math.round(min)}{temperature}</em>
				<em>&ndash;</em>
				<em className="max">Max: {Math.round(max)}{temperature}</em>
			</div>
		);

	}

}