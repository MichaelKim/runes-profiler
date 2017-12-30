import React from 'react';
import PropTypes from 'prop-types';

import AccentRow from './accentrow.jsx';

const RuneDisplay = ({ rune, color, playerData, globalData }) => {
	let info = <p style={{ margin: '0' }}><i>Not enough games played</i></p>;

	if (playerData && playerData.games && globalData && globalData.games) {
		const playerWinrate = playerData.wins / playerData.games * 100;
		const globalWinrate = globalData.wins / globalData.games * 100;

		const stats = rune.statsDesc.map((desc, i) => {
			if (desc === 'Time Completed' || desc === 'Boots Arrival Time') {
				const playerStat = Math.round((playerData.stats[i] * 60 + playerData.stats[i+1]) / playerData.games);
				const globalStat = Math.round((globalData.stats[i] * 60 + globalData.stats[i+1]) / globalData.games);

				if (playerStat > 0) {
					return (
						<AccentRow
							key={i}
							left={Math.round(playerStat / 60) + ':' + (playerStat % 60).toString().padStart(2, '0')}
							mid={desc}
							right={Math.round(globalStat / 60) + ':' + (globalStat % 60).toString().padStart(2, '0')}
							bold={playerStat < globalStat}
						/>
					);
				}

				return (
					<AccentRow
						key={i}
						left={'N/A'}
						mid={desc}
						right={Math.round(globalStat / 60) + ':' + (globalStat % 60).toString().padStart(2, '0')}
						bold={false}
					/>
				);
			}
			else {
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
			}
			
		});

		info = (
			<table>
				<tbody>
					<tr>
						<th>You</th>
						<th>Average</th>
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
	else if (globalData && globalData.games) {
		const globalWinrate = globalData.wins / globalData.games * 100;

		const stats = rune.statsDesc.map((desc, i) => {
			if (desc === 'Time Completed' || desc === 'Boots Arrival Time') {
				const globalStat = Math.round((globalData.stats[i] * 60 + globalData.stats[i+1]) / globalData.games);

				return (
					<AccentRow
						key={i}
						left=''
						mid={desc}
						right={Math.round(globalStat / 60) + ':' + (globalStat % 60).toString().padStart(2, '0')}
						bold={true}
					/>
				);
			}
			else {
				const globalStat = globalData.stats[i] / globalData.games;

				return (
					<AccentRow
						key={i}
						left=""
						mid={desc}
						right={+globalStat.toFixed(2)}
						bold={true}
					/>
				);
			}
		});

		info = (
			<div>
				<p style={{ margin: '0' }}><i>Play games with {rune.name}!</i></p>
				<table>
					<tbody>
						<tr>
							<th colSpan="2">Global Average</th>
						</tr>
						<AccentRow
							left=""
							mid='Winrate'
							right={+globalWinrate.toFixed(2) + '%'}
							bold={true}
						/>
						{ stats }
					</tbody>
				</table>
			</div>
		);
	}

	return (
		<div className='rune' style={{ backgroundColor: color}}>
			<h2 className='rune-name'>{rune.name}</h2>
			<img src={'../assets/runes/' + rune.id + '.png'} className='rune-image'/>
			{ info }
		</div>
	);
};

RuneDisplay.propTypes = {
	rune: PropTypes.object.isRequired,
	color: PropTypes.string.isRequired,
	playerData: PropTypes.object,
	globalData: PropTypes.object
};

module.exports = RuneDisplay;