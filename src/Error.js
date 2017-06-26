import React, { Component } from 'react';

export default class extends Component {

    render() {
        return (
            <div className="error">
                <span>Error: {this.props.msg}</span>
            </div>
        );
    }

}