

export default {
	METRIC: 'metric',
	IMPERIAL: 'imperial',

	API_BASE_URL    : 'http://api.openweathermap.org/data/2.5/forecast?mode=json&',
	API_URL_PARAMS  : 'id={locationId}&appid={apiKey}&units={units}',
	API_LOCATION_ID : '2643743',
	API_ACCESS_KEY  : '67c8d943a6b50ada4d9384d4e64d8a86',
	LOCATION_NAME	: 'London',
	LOCATIONS       : [
		{ name: 'London',		id: 2643743 },
		{ name: 'New York', 	id: 5128638 },
		{ name: 'Moscow',  		id: 5601538 },
		{ name: 'Chelmsford', 	id: 7290541 },
		{ name: 'Los Angeles', 	id: 3882428 },
		{ name: 'Tokyo',		id: 1850147 }
	],

	WEEK            : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

	metric_UNICODE  : '\u2103',
	metric_SPEED    : 'Kph',
	imperial_UNICODE : '\u2109',
	imperial_SPEED  : 'Mph',

	TIME_PERIODS : 8

}