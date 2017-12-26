import React from 'react';
import PropTypes from 'prop-types';

import AccentRow from './accentrow.jsx';

const Keystone = ({ keystone, color, playerData, globalData }) => {
	let info = <p>Not enough games played</p>;

	if (playerData && playerData.games && globalData) {
		const playerWinrate = playerData.wins / playerData.games * 100;
		const globalWinrate = globalData.wins / globalData.games * 100;

		const stats = keystone.statsDesc.map((desc, i) => {
			const playerStat = playerData.stats[i] / playerData.games;
			const globalStat = globalData.stats[i] / globalData.games;

			return (
				<AccentRow
					key={i}
					left={+playerStat.toFixed(2)}
					mid={desc}
					right={+globalStat.toFixed(2)}
					bold={playerStat > globalStat}
				/>
			);
		});

		info = (
			<table>
				<tbody>
					<tr>
						<th>You</th>
						<th></th>
						<th>Global</th>
					</tr>
					<AccentRow
						left={+playerWinrate.toFixed(2) + '%'}
						mid='Winrate'
						right={+globalWinrate.toFixed(2) + '%'}
						bold={playerWinrate > globalWinrate}
					/>
					{ stats }
				</tbody>
			</table>
		);
	}

	return (
		<div className='keystone' style={{ backgroundColor: color}}>
			<h2 className='keystone-name'>{keystone.name}</h2>
			<img src={'../assets/runes/' + keystone.id + '.png'} className='keystone-image'/>
			{ info }
		</div>
	);
};

Keystone.propTypes = {
	keystone: PropTypes.object.isRequired,
	color: PropTypes.string.isRequired,
	playerData: PropTypes.object,
	globalData: PropTypes.object
};

module.exports = Keystone;