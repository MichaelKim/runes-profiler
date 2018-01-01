import React from 'react';
import PropTypes from 'prop-types';

const PagesDisplay = ({ data }) => {
	let pages = [];

	if (data) {
		const sorted = Object.entries(data).sort((a, b) => (a[1].wins / a[1].games) > (b[1].wins / b[1].games));

		for (let i = 0; i < Math.min(sorted.length, 2); i++) {
			const [pageId, pageData] = sorted[i];

			const winrate = (pageData.wins / pageData.games * 100).toFixed(2);
			const runes = pageId.split('@').map(rune => (
				<img
					style={{ width: '50px', height: '50px' }}
					src={'../assets/runes/' + rune + '.png'}
					key={rune}
				/>
			));

			pages.push(
				<div key={i}>
					{runes}
					<p>Winrate: {winrate}%</p>
				</div>
			);
		}
	}

	return (
		<div style={{ flex: '1', textAlign: 'center', border: '3px solid #ab8f57', margin: '10px 0 0 10px' }}>
			<h2 style={{ margin: '10px' }}>Pages</h2>
			{ data ?
				pages :
				<p>Not enough data</p>
			}
		</div>
	);
}

PagesDisplay.propTypes = {
	data: PropTypes.object
};

module.exports = PagesDisplay;
