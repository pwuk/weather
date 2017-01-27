import Constants from './Constants';

export default function (units = Constants.METRIC, callBack) {

	let url = Constants.API_BASE_URL +
				Constants.API_URL_PARAMS
					.replace('{locationId}', Constants.API_LOCATION_ID)
					.replace('{apiKey}', Constants.API_ACCESS_KEY)
					.replace('{units}', units);

	fetch(url)
		.then((response) => response.json() )
		.then(callBack)
}