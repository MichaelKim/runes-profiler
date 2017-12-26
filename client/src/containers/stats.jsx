import React from 'react';
import PropTypes from 'prop-types';

import Profile from './profile.jsx';
import Keystones from './keystones.jsx';


const Stats = ({ data }) => {
	return (
		<div id="center">
			<div id="stats" className="fadein">
				<Profile
					image='../assets/profile-icon.png'
					name={data.player.name}
				/>
				<Keystones data={data}/>
			</div>
		</div>
	);
}

Stats.propTypes = {
	data: PropTypes.object.isRequired
};

module.exports = Stats;