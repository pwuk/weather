import Constants from './Constants';

export default function (units = Constants.METRIC, cityId, callBack, errorCallback) {

	let url = Constants.API_BASE_URL +
				Constants.API_URL_PARAMS
					.replace('{locationId}', cityId)
					.replace('{apiKey}', Constants.API_ACCESS_KEY)
					.replace('{units}', units);

	fetch(url)
		.then((response) => response.json() )
		.then(callBack)
		.catch(errorCallback);
}