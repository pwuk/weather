import React, { Component } from 'react';
import Constants from './Constants';
import Time from './Time';
import EmptyTime from './EmptyTime';


export default class extends Component {

	render() {

		let emptyTimes = new Array(Constants.TIME_PERIODS -  this.props.data.times.length);
     	let missingDataPast = false;
        let emptyElements = emptyTimes.fill(0).map( (dummy, ndx) => {
			return <EmptyTime key={ndx} />
		});

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

		let temperature = Constants[this.props.units + '_UNICODE'];

		let range = times.reduce( (range, time) => {
			range.min = Math.min(range.min, time.main.temp_min);
			range.max = Math.max(range.max, time.main.temp_max);
			return range;
		}, {max: -Infinity, min: Infinity} );

		return (
			<div>
				<em className="min">Min: {Math.round(range.min)}{temperature}</em>
				<em>&ndash;</em>
				<em className="max">Max: {Math.round(range.max)}{temperature}</em>
			</div>
		);

	}

}