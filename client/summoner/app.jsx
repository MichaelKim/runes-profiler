import React from 'react';
import PropTypes from 'prop-types';

import Background from '../containers/background.jsx';
import Header from '../containers/header.jsx';
import Footer from '../containers/footer.jsx';
import Loader from '../containers/loader.jsx';
import Profile from '../containers/profile.jsx';
import Update from '../containers/update.jsx';
import RunesDisplay from '../containers/runesdisplay.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			data: {},
			selectedPath: -1,
			showUpdateError: false
		};

		makeRequest('/player?name=' + this.props.name + '&region=' + this.props.region, (data) => {
			this.setState({
				loaded: true,
				data: data,
				selectedPath: 0
			});
		});
	}

	updateProfile() {
		this.setState({
			loaded: false,
			selectedPath: -1
		});
		makeRequest('/update?name=' + this.props.name + '&region=' + this.props.region, (data) => {
			this.setState({
				loaded: true,
				data: data,
				selectedPath: 0
			});
		});
	}

	render() {
		return (
	    	<React.Fragment>
				<Background index={this.state.selectedPath} />
			    {
			    	this.state.loaded ?
			    	<React.Fragment>
						<Header />
				    	<div id='center'>
							<div id='stats' className='fadein'>
								<div id='stats-top'>
									<Profile
										imageId={this.state.data.profileData.icon}
										name={this.state.data.profileData.name}
									/>
									<Update
										onUpdate={() => this.updateProfile()}
										lastUpdated={this.state.data.profileData.lastUpdated}
									/>
								</div>
								<RunesDisplay
									data={this.state.data}
			    					onSelect={i => this.setState({ selectedPath: i})}
								/>
							</div>
						</div>
		    		</React.Fragment> :
		    		<Loader />
		    	}
		    	<Footer />
		    </React.Fragment>
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