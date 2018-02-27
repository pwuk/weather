import React from 'react';
import Constants from './Constants';
import Time from './Time';
import EmptyTime from './EmptyTime';

// const timesToCss = [{
// 	className: 'night',
// 	range:[ '00:00', '06:00']
// }, {
// 	className: 'early',
//     range:[ '06:00', '08:00']
// }, {
//     className: 'day',
//     range:[ '08:00', '17:00']
// }, {
//     className: 'evening',
//     range:[ '07:00', '21:00']
// }, {
//     className: 'night',
//     range:[ '17:00', '00:00']
// }];

const getDate = (date) => {
	const dayOfWeek = new Date(date).getDay();
	return (
		<p className="day-name">
			{Constants.WEEK[dayOfWeek]}
		</p>
	);
};

const getDaySummary = (times, units) => {
	const temperature = Constants[units + '_UNICODE'];
	const range = times.reduce( (range, time) => {
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

};

export default (props) => {

    let missingDataPast = false;
    const emptyTimes = new Array(Constants.TIME_PERIODS -  props.data.times.length);
    const emptyElements = emptyTimes.fill(0).map( (dummy, ndx) => {
        return <EmptyTime key={ndx} />
    });

    if(emptyTimes.length) {
        if(props.data.times[0].dt_txt.slice(11,16) !== '00:00') {
            missingDataPast = true;
        }
    }

    return (
        <div className="day">
            <div className="date">
                {getDate(props.data.day)}
                {getDaySummary(props.data.times, props.units)}
            </div>
            <div className="date-data">
                {missingDataPast ? emptyElements : null}
                {
                    props.data.times.map( (time, ndx) =>
                        <Time key={ndx} data={time} units={props.units} />
                    )
                }
                {missingDataPast ? null : emptyElements}
            </div>
        </div>
    );
}