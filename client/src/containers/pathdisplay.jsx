import React from 'react';
import PropTypes from 'prop-types';

import RuneDisplay from './runedisplay.jsx';

const PathDisplay = ({ tree, data, color, selected }) => {
	return (
		<div
			className='path-display'
			style={{ opacity: selected ? '1' : '0' }}
		>
		{
			tree.runes.map((r, i) => (
				<RuneDisplay
					keystone={r}
					color={color}
					playerData={data.playerData[r.id]}
					globalData={data.globalData[r.id]}
					key={i}
				/>
			))
		}
		</div>
	);
};

PathDisplay.propTypes = {
	tree: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
	color: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired
};

module.exports = PathDisplay;