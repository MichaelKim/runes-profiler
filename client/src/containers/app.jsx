import React from 'react';
import PropTypes from 'prop-types';

import Background from './background.jsx';
import Loader from './loader.jsx';
import Profile from './profile.jsx';
import Update from './update.jsx';
import Search from './search.jsx';
import RunesDisplay from './runesdisplay.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			data: {},
			selectedPath: -1,
			showUpdateError: false
		};
	}

	componentDidMount() {
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
						<div className='header-box'>
							<div className='header'>
								<a className='logo' href='http://localhost:5000'>Runes Profiler</a>
								<Search />
							</div>
						</div>
						<div className='menu-box'>
							<div className='menu'>
								<div className='menu-item'>
									<a href='http://localhost:5000'>Summoner</a>
								</div>
								<div className='menu-item'>
									<a href='http://localhost:5000'>Champions</a>
								</div>
								<div className='menu-item'>
									<a href='http://localhost:5000'>Statistics</a>
								</div>
							</div>
						</div>
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