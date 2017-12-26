import React from 'react';
import PropTypes from 'prop-types';

import Profile from './profile.jsx';
import RunesDisplay from './runesdisplay.jsx';


const Stats = ({ data, onSelect }) => {
	return (
		<div id="center">
			<div id="stats" className="fadein">
				<Profile
					imageId={data.player.icon}
					name={data.player.name}
				/>
				<RunesDisplay
					data={data}
					onSelect={onSelect}
				/>
			</div>
		</div>
	);
}

Stats.propTypes = {
	data: PropTypes.object.isRequired,
	onSelect: PropTypes.func.isRequired
};

module.exports = Stats;