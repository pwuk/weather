/**
 * Query open weather data API
 *
 * https://openweathermap.org/forecast5
 */
import Constants from './Constants';

export default function (units = Constants.METRIC, cityId) {

	let url = Constants.API_BASE_URL +
				Constants.API_URL_PARAMS
					.replace('{locationId}', cityId)
					.replace('{apiKey}', Constants.API_ACCESS_KEY)
					.replace('{units}', units);

	return fetch(url)
        .then((response) => response.json() )
        .catch((error) =>  {
	        throw new Error(error)
        });
}