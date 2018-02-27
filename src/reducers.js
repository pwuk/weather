

export default ( state, action) => {

    switch (action.type) {

        case 'SET_WEATHER_DATA':
            console.log(state, action);
            break;


        default:
            return state;

    }


}