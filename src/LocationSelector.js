import React from 'react';
import Constants from './Constants';

export default (props) => {
    let cities = Constants.LOCATIONS;

    return (
        <div className="locationselector">
            <form>
                <em>Which City : </em>
                {cities.map( city =>
                    <div key={city.id}>
                        <label>
                            <input type="radio"
                                   name="city"
                                   defaultChecked={city.id===props.defaultSelection}
                                   onClick={()=>props.selectionChange(city.id)}
                            />
                            {city.name}
                        </label>
                    </div>
                )}
            </form>
        </div>
    );

};
