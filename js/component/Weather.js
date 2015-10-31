import React from 'react';
import {connect} from 'react-redux';
import {search, submitSearch} from '../model/weatherActions';
import $ from 'jquery';
import config from '../config';

class Weather extends React.Component {

    changeQuery(e) {
        const dispatch = this.props.dispatch;
        dispatch(search(e.target.value));
    }

    submit() {
        const dispatch = this.props.dispatch;
        dispatch(submitSearch());
    }

    render() {
        return <div>
            Place ({this.props.query}):
            <p>
                <input
                    type="text"
                    className="input"
                    onChange={this.changeQuery.bind(this)}
                />

                <input
                    type="button"
                    className="btn btn-primary"
                    value="Search"
                    onClick={this.submit.bind(this)}
                />
            </p>

            {this.props.weather && <p>
                temperature: {this.props.weather.main.temp}<br/>
                better temperature: {this.props.weather.main.temp * 2}
            </p>}
        </div>;
    }

}

Weather = connect(state => ({
    query: state.weather.query,
    weather: state.weather.weather,
}))(Weather);

export default Weather;
