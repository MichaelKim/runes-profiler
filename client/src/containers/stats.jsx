import React from 'react';
import PropTypes from 'prop-types';

import Profile from './profile.jsx';

const Stats = ({ data }) => {
	return (
		<div id="center">
			<div id="stats" className="fadein">
				<Profile
					image='../assets/profile-icon.png'
					name={data.player.name}
				/>
				<h2>Keystones</h2>
					<div class="keystones">
					<h3>Precision</h3>
					{
						data.playerData[8005] ?
						<div>
							<h4>Press the Attack</h4>
						</div> :
						null
					}
					<h4>Lethal Tempo</h4>
					<h4>Fleet Footwork</h4>
					<h3>Dominiation</h3>
					<h3>Sorcery</h3>
					<h3>Resolve</h3>
					<h3>Inspiration</h3>
				</div>
			</div>
		</div>
	);
}

Stats.propTypes = {
	data: PropTypes.object.isRequired
};

module.exports = Stats;