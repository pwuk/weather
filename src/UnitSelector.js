import React from 'react';
import Constants from './Constants';
// import PropTypes from 'prop-types';


export default function(props) {

        return (
			<div className="unitselector">
				<form>
					<em>Select Temperature and Speed Units : </em>
					<div>
						<label>
							<input type="radio"
								   name="units"
								   value={Constants.METRIC}
								   defaultChecked
								   onClick={() => props.selectionChange(Constants.METRIC)}
							/>
							Centigrade and KPH
						</label>
					</div>
					<div>
						<label>
							<input type="radio"
								   name="units"
								   value={Constants.IMPERIAL}
								   onClick={() => props.selectionChange(Constants.IMPERIAL)}
							/>
							Fahrenheit and MPH
						</label>
					</div>
				</form>
			</div>
        );
};
