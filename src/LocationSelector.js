import React, { Component } from 'react';
import Constants from './Constants';


export default class extends Component {

    render() {
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
                                       defaultChecked={city.id==this.props.defaultSelection}
                                       onClick={()=>this.props.selectionChange(city.id)}
                                />
                                {city.name}
                            </label>
                        </div>
                    )}
                </form>
            </div>
        );
    }

}