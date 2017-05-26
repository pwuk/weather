import React, { Component } from 'react';
import Constants from './Constants';


export default class extends Component {

	render() {
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
						       onClick={()=>this.props.selectionChange(Constants.METRIC)}
							/>
							Centigrade and KPH
						</label>
					</div>
					<div>
						<label>
							<input type="radio"
						       name="units"
						       value={Constants.IMPERIAL}
						       onClick={()=>this.props.selectionChange(Constants.IMPERIAL)}
							/>
							Farenheit and MPH
						</label>
					</div>
				</form>
			</div>
		);
	}

}