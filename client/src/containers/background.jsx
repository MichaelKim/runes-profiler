import React from 'react';
import PropTypes from 'prop-types';

const Background = ({ index }) => {
	const images = [];
	for (let i = 0; i < 5; i++) {
		images.push(
			<div className="bg-image" key={i} style={{
				backgroundImage: 'url(../assets/pathsplash/' + i + '.png)',
				opacity: index === i ? '1' : '0'
			}} />
		);
	}

	return (
		<div>
			{images}
		</div>
	);
}

Background.propTypes = {
	index: PropTypes.number.isRequired
};

module.exports = Background;