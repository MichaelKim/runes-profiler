import React from 'react';
import PropTypes from 'prop-types';

const KeystonesDisplay = ({ data }) => {
	let keystones = [];

	if (data) {
		const sorted = Object.entries(data).sort((a, b) => (a[1].wins / a[1].games) < (b[1].wins / b[1].games));

		for (let i = 0; i < Math.min(sorted.length, 6); i++) {
			const [runeId, runeData] = sorted[i];
			const winrate = (runeData.wins / runeData.games * 100).toFixed(2);

			keystones.push(
				<div key={i}>
					<img style={{ width: '100px', height: '100px' }} src={'../assets/runes/' + runeId + '.png'} />
					<p>Winrate: {winrate}%</p>
				</div>
			);
		}
	}

	return (
		<div style={{ width: '50%', display: 'inline-block'}}>
			<h2>Keystones</h2>
			{ data ?
				keystones :
				<p>Not enough data</p>
			}
		</div>
	);
}

KeystonesDisplay.propTypes = {
	data: PropTypes.object
};

module.exports = KeystonesDisplay;
