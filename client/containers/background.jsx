import React from 'react';
import PropTypes from 'prop-types';

const Background = ({ index }) => {
	let images = [];
	
	for (let i = 0; i < 5; i++) {
		images.push(
			<div
				className="bg-image"
				style={{
					backgroundImage: 'url(../assets/pathsplash/' + i + '.png)',
					opacity: index === i ? '1' : '0'
				}}
				key={i}
			/>
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