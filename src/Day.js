import React, { Component } from 'react';
import Constants from './Constants';
import Time from './Time';
import PastTime from './PastTime';


export default class extends Component {

	render() {

		let pastTimes = new Array(Constants.TIME_PERIODS -  this.props.data.times.length);
		pastTimes.fill(0);

		return (
			<div className="day">
				<div className="date">
					{this.getDate(this.props.data.day)}
					{this.getDaySummary(this.props.data.times)}
				</div>
				<div className="date-data">
					{
						pastTimes.map( (dummy, ndx) => {
							return <PastTime key={ndx} />
						})
					}
					{
						this.props.data.times.map( (time, ndx) => {
							return <Time key={ndx} data={time} units={this.props.units} />
						})
					}
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