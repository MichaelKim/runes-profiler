import React from 'react';
import PropTypes from 'prop-types';

const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Update = ({ lastUpdated })  => {
	let dateString = 'Never';
	if (lastUpdated) {
		let d = new Date(lastUpdated);
		dateString = Months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' +
			d.getHours() + ':' + d.getMinutes().toString().padStart(2, '0');
	}
	
	return (
		<div className='update-box'>
			<p className='last-updated'>Last updated:<br/>{dateString}</p>
	    </div>
	);
}

Update.propTypes = {
	lastUpdated: PropTypes.number.isRequired
};

module.exports = Update;

								