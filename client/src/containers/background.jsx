import React from 'react';
import PropTypes from 'prop-types';

const Background = ({ url }) => {
	return (
		<div id="bg-image" style={{
			backgroundImage: 'url(' + url + ')'
		}} />
	);
}

Background.propTypes = {
	url: PropTypes.string.isRequired
};

module.exports = Background;