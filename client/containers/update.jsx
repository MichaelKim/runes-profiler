import React from 'react';
import PropTypes from 'prop-types';

const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class Update extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showUpdateError: false
		};
	}

	checkUpdate() {
		console.log(Date.now() - this.props.lastUpdated);
		if (!this.props.lastUpdated || Date.now() - this.props.lastUpdated > 1000 * 60 * 5) {
			this.props.onUpdate();
		}
		else {
			this.setState({ showUpdateError: true });
			setTimeout(() => this.setState({ showUpdateError: false }), 2000);
		}
	}

	render() {
		let dateString = 'Never';
		if (this.props.lastUpdated) {
			let d = new Date(this.props.lastUpdated);
			dateString = Months[d.getMonth()] + ' ' + d.getDay() + ' ' + d.getFullYear() + ' ' +
				d.getHours() + ':' + d.getMinutes().toString().padStart(2, '0');
		}
		
		return (
			<div className='update-box'>
				<button
					className='update-button'
					onClick={() => this.checkUpdate()}
				>Update</button>
				<p className='last-updated'>Last updated:<br/>{dateString}</p>
				<p className='invalid-update' style={{
					opacity: this.state.showUpdateError ? '1' : '0'
				}}>Updated too soon, try again</p>
		    </div>
		);
	}
}

Update.propTypes = {
	onUpdate: PropTypes.func.isRequired,
	lastUpdated: PropTypes.number.isRequired
};

module.exports = Update;

								