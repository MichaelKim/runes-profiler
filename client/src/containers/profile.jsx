import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({ image, name }) => {
	return (
		<div className="profile">
			<img className="profile-image" src={ image }></img>
			<h1 className="profile-name">{ name }</h1>
		</div>	
	);
}

Profile.propTypes = {
	image: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};

module.exports = Profile;