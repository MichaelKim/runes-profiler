import React from 'react';
import PropTypes from 'prop-types';

class KeystonesDisplay extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.data) {
			let sorted = Object.entries(this.props.data).sort((a, b) => (a.wins / a.games) > (b.wins / b.games));

			let keystones = [];

			for (let i = 0; i < 6 && i < sorted.length; i++) {
				let winrate = (sorted[i][1].wins / sorted[i][1].games * 100).toFixed(2);
				keystones.push(
					<div>
						<img style={{ width: '100px', height: '100px' }} src={'../assets/runes/' + sorted[i][0] + '.png'} />
						<p>Winrate: {winrate}%</p>
					</div>
				);
			}

			return (
				<div style={{ width: '50%', display: 'inline-block'}}>
					<h2>Keystones</h2>
					{keystones}
				</div>
			);
		}

		return (
			<div style={{ width: '50%', display: 'inline-block'}}>
				<h2>Keystones</h2>
				<p>Not enough data</p>
			</div>
		);
	}
}

KeystonesDisplay.propTypes = {
	data: PropTypes.object.isRequired
};

module.exports = KeystonesDisplay;
