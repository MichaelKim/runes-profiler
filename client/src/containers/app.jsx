import React from 'react';
import PropTypes from 'prop-types';

import Background from './background.jsx';
import Loader from './loader.jsx';
import Stats from './stats.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			data: {}
		};
	}

	componentDidMount() {
		makeRequest('/test?name=' + this.props.name + '&region=' + this.props.region, (data) => {
			this.setState({
				loaded: true,
				data: data
			});
		});
	}

	render() {
		return (
			<div>
				<Background url='../assets/landing-bg.jpg' />
			    {
			    	this.state.loaded ?
			    	<div id="center">
			    		<Stats data={this.state.data} />
		    		</div> :
		    		<Loader />
		    	}
		    </div>
		);
	}
}

App.propTypes = {
	name: PropTypes.string.isRequired,
	region: PropTypes.string.isRequired
};

module.exports = App;

function makeRequest(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				console.log(xhr.responseText);
				callback(JSON.parse(xhr.responseText));
			}
			else {
				console.log('HTTP Error ' + xml.status);
				console.log(xml.responseText);
				console.log(xml.statusText);
			}
		}
	}
	xhr.open('GET', 'http://localhost:5000' + url, true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.send();
}