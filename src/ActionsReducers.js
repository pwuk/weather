import Constants from './Constants';

let initialState = {
    units           : Constants.METRIC,
    weatherData     : [],
    errorData       : {},
    cityData        : { id:2643743 },
    loading         : true,
    error           : false,
    string          :'hello worlds'
};

// function findCityName(cityId) {
//     return Constants.LOCATIONS.find((location)=>location.id===cityId).name;
// }

const Actions = (state = initialState, action) => {

    switch(action.type) {
        case 'SELECT_CITY':
            return {...state,
                cityData:{id: action.city}
            };

        case 'SET_CITY':
            return {...state,
                cityData: action.data.city
            };

        case 'SET_UNITS':
            return {...state,
                units:action.units
            };

        case 'SET_WEATHER_DATA':
            return action.data.cod !== '200' ?
                {...state, errorData: action.data, loading: false, error: true}
                :
                {...state, weatherData: transformWeatherData(action.data), loading: false};

        case 'SET_LOADING':
            return state;

        case 'SET_ERROR':
            return {...state, errorData: action.data, loading: false, error: true};

        default:
            return state;
    }

};

export default Actions;


/**
 * transform data from weather service into format consumable by UI
 *
 * @param rawData
 * @returns array[{
	 *              date:'',
	 *              times[{}]
	 *          ]
	 */
function transformWeatherData( rawData ) {
    return rawData.list.reduce( (acc, data) => {
        let dateKey = data.dt_txt.slice(0,10);
        if(!acc[0].hasOwnProperty(dateKey)) {
            acc[0][dateKey] = []
        }
        acc[0][dateKey].push(data);
        return acc
    }, [{}])
        .reduce( (acc, obj) => {
            Object.keys(obj).forEach( (key) => {acc.push( {day:key, times:obj[key]}) });
            return acc;
        }, []);

}