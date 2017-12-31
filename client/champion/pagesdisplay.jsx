import React from 'react';
import PropTypes from 'prop-types';

class PagesDisplay extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let sorted = Object.entries(this.props.data).sort((a, b) => (a.wins / a.games) > (b.wins / b.games));

		let pages = [];

		for (let i = 0; i < 2 && i < sorted.length; i++) {
			let winrate = (sorted[i][1].wins / sorted[i][1].games * 100).toFixed(2);
			let runes = sorted[i][0].split('@').map(rune => (
				<img style={{ width: '50px', height: '50px' }} src={'../assets/runes/' + rune + '.png'} />
			));
			pages.push(
				<div>
					{runes}
					<p>Winrate: {winrate}%</p>
				</div>
			);
		}

		return (
			<div style={{ width: '50%', display: 'inline-block'}}>
				<h2>Pages</h2>
				{pages}
			</div>
		);
	}
}

PagesDisplay.propTypes = {
	data: PropTypes.object.isRequired
};

module.exports = PagesDisplay;
