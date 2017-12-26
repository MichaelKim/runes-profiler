import React from 'react';
import PropTypes from 'prop-types';

class Keystones extends React.Component {
	constructor(props) {
		super(props);
		const data = this.props.data;

		this.state = {
			selectedTree: 0
		};
		this.selectTree = this.selectTree.bind(this);

		this.keystonesTop = [];
		this.keystonesBox = [];

		for (let i = 0; i < Runes.length; i++) {
			const tree = Runes[i];
			this.keystonesTop.push(
				<div id={tree.name.toLowerCase() + '-button'} key={i} onClick={this.selectTree}>
					{tree.name}
				</div>
			);

			this.keystonesBox[i] = [];

			for (let j = 0; j < tree.keystones.length; j++) {
				const keystone = tree.keystones[j];
				let info = <p style={{ display: 'table', margin: '0 auto' }}>Not enough games played</p>
				if (data.playerData[keystone.id] && data.playerData[keystone.id].games) {
					const playerWinrate = +(data.playerData[keystone.id].wins / data.playerData[keystone.id].games * 100).toFixed(2) + '%';
					const globalWinrate = +(data.globalData[keystone.id].wins / data.globalData[keystone.id].games * 100).toFixed(2) + '%';
					info = (
						<table style={{ margin: '0 auto' }}>
							<tbody>
								<tr>
									<th>You</th>
									<th></th>
									<th>Global</th>
								</tr>
								<tr>
									<td>{playerWinrate}</td>
									<td>Winrate</td>
									<td>{globalWinrate}</td>
								</tr>
							</tbody>
						</table>
					);
				}

				this.keystonesBox[i].push(
					<div className='keystone' key={j}>
						<h2 style={{ margin: '5px 0' }}>{keystone.name}</h2>
						<img src='../assets/profile-icon.png' style={{
							width: '50px',
							borderRadius: '25px'
						}} />
						{ info }
					</div>
				);
			}
		}
	}

	selectTree(e) {
		let id = 0;
		switch (e.target.id) {
			case 'precision-button': id = 0; break;
			case 'domination-button': id = 1; break;
			case 'sorcery-button': id = 2; break;
			case 'resolve-button': id = 3; break;
			case 'inspiration-button': id = 4; break;
		}
		this.setState({ selectedTree: id });
	}

	render() {
		// const keystones = Runes.reduce((acc, tree) => {
		// 	return acc.concat(
		// 		<h3>{ tree.name }</h3>,
		// 		tree.keystones.reduce((acc, rune) => {
		// 			if (data.playerData[rune.id]) return acc.concat(<h4>{ rune.name }</h4>);
		// 			return acc;
		// 		}, [])
		// 	);
		// }, []);

		return (
			<div>
				<div style={{
					textAlign: 'center'
				}}>
					<h2 style={{
						margin: '5px'
					}}>KEYSTONES</h2>
				</div>
				<div id="keystones">
					<div id="keystones-top">
						{ this.keystonesTop }
					</div>
					{ this.keystonesBox[this.state.selectedTree ] }
				</div>
			</div>
		);
	}
}

Keystones.propTypes = {
	data: PropTypes.object.isRequired
};

const Runes = [
	{
		name: 'Precision',
		keystones: [
			{
				name: 'Press the Attack',
				id: 8005
			},
			{
				name: 'Lethal Tempo',
				id: 8008
			},
			{
				name: 'Fleet Footwork',
				id: 8021
			}
		]
	},
	{
		name: 'Domination',
		keystones: [
			{
				name: 'Electrocute',
				id: 8112
			},
			{
				name: 'Predator',
				id: 8124
			},
			{
				name: 'Dark Harvest',
				id: 8128
			}
		]
	},
	{
		name: 'Sorcery',
		keystones: [
			{
				name: 'Summon Aery',
				id: 8214
			},
			{
				name: 'Arcane Comet',
				id: 8229
			},
			{
				name: 'Phase Rush',
				id: 8230
			}
		]
	},
	{
		name: 'Resolve',
		keystones: [
			{
				name: 'Grasp of the Undying',
				id: 8437
			},
			{
				name: 'Aftershock',
				id: 8439
			},
			{
				name: 'Guardian',
				id: 8465
			}
		]
	},
	{
		name: 'Inspiration',
		keystones: [
			{
				name: 'Unsealed Spellbook',
				id: 8326
			},
			{
				name: 'Glacial Augment',
				id: 8351
			},
			{
				name: 'Kleptomancy',
				id: 8359
			}
		]
	}
];

module.exports = Keystones;