import React from 'react';
import PropTypes from 'prop-types';

function getPercent(num, den) {
	let value = Math.round(num / den * 100);
	if (value > 1000) {
		return (value / 1000).toFixed(1) + 'k';
	}
	return value;
}

class Keystones extends React.Component {
	constructor(props) {
		super(props);
		const data = this.props.data;

		this.state = {
			selectedTree: 0
		};
		this.selectTree = this.selectTree.bind(this);

		const colors = [
			'rgba(126, 101, 31, 0.6)',
			'rgba(122, 5, 31, 0.6)',
			'rgba(10, 15, 89, 0.6)',
			'rgba(15, 97, 3, 0.6)',
			'rgba(19, 95, 106, 0.6)'
		];

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
				let info = <p>Not enough games played</p>
				if (data.playerData[keystone.id] && data.playerData[keystone.id].games) {
					const playerWinrate = getPercent(data.playerData[keystone.id].wins, data.playerData[keystone.id].games);
					const globalWinrate = getPercent(data.globalData[keystone.id].wins, data.globalData[keystone.id].games);

					let stats = [];
					for (let k = 0; k < keystone.statsVars; k++) {
						const playerStat = getPercent(data.playerData[keystone.id].stats[k], data.playerData[keystone.id].games);
						const globalStat = getPercent(data.globalData[keystone.id].stats[k], data.globalData[keystone.id].games);

						stats.push(
							<tr key={k}>
								<td>{playerStat}</td>
								<td>{keystone.statsDesc[k]}</td>
								<td>{globalStat}</td>
							</tr>
						);
					}

					info = (
						<table>
							<tbody>
								<tr>
									<th>You</th>
									<th></th>
									<th>Global</th>
								</tr>
								<tr>
									<td>{playerWinrate + '%'}</td>
									<td>Winrate</td>
									<td>{globalWinrate + '%'}</td>
								</tr>
								{ stats }
							</tbody>
						</table>
					);
				}

				this.keystonesBox[i].push(
					<div className='keystone' style={{ backgroundColor: colors[i]}} key={j}>
						<h2 className='keystone-name'>{keystone.name}</h2>
						<img src={'../assets/runes/' + keystone.id + '.png'} className='keystone-image'/>
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
					{ this.keystonesBox.map((box, index) => (
						<div className="keystones-box" key={index} style={{
							opacity: this.state.selectedTree === index ? '1' : '0'
						}}>
							{box}
						</div>
					)) }
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
				id: 8005,
				statsVars: 3,
				statsDesc: [
					"Total Damage",
					"Bonus Damage",
					"Expose Damage"
				]
			},
			{
				name: 'Lethal Tempo',
				id: 8008,
				statsVars: 1,
				statsDesc: [
					"Total Active Time"
				]
			},
			{
				name: 'Fleet Footwork',
				id: 8021,
				statsVars: 1,
				statsDesc: [
					"Total Healing"
				]
			}
		]
	},
	{
		name: 'Domination',
		keystones: [
			{
				name: 'Electrocute',
				id: 8112,
				statsVars: 1,
				statsDesc: [
					"Total Damage Dealt"
				]
			},
			{
				name: 'Predator',
				id: 8124,
				statsVars: 1,
				statsDesc: [
					"Total Damage to Champions"
				]
			},
			{
				name: 'Dark Harvest',
				id: 8128,
				statsVars: 1,
				statsDesc: [
					"Total Damage Dealt"
				]
			}
		]
	},
	{
		name: 'Sorcery',
		keystones: [
			{
				name: 'Summon Aery',
				id: 8214,
				statsVars: 2,
				statsDesc: [
					"Damage Dealt",
					"Damage Shielded"
				]
			},
			{
				name: 'Arcane Comet',
				id: 8229,
				statsVars: 1,
				statsDesc: [
					"Total Damage Dealt"
				]
			},
			{
				name: 'Phase Rush',
				id: 8230,
				statsVars: 1,
				statsDesc: [
					"Total Activations"
				]
			}
		]
	},
	{
		name: 'Resolve',
		keystones: [
			{
				name: 'Grasp of the Undying',
				id: 8437,
				statsVars: 2,
				statsDesc: [
					"Total Damage",
					"Total Healing"
				]
			},
			{
				name: 'Aftershock',
				id: 8439,
				statsVars: 1,
				statsDesc: [
					"Total Damage Dealt"
				]
			},
			{
				name: 'Guardian',
				id: 8465,
				statsVars: 1,
				statsDesc: [
					"Total Shield Strength"
				]
			}
		]
	},
	{
		name: 'Inspiration',
		keystones: [
			{
				name: 'Unsealed Spellbook',
				id: 8326,
				statsVars: 1,
				statsDesc: [
					"Summoners Swapped"
				]
			},
			{
				name: 'Glacial Augment',
				id: 8351,
				statsVars: 1,
				statsDesc: [
					"Bonus Time Enemies Slowed"
				]
			},
			{
				name: 'Kleptomancy',
				id: 8359,
				statsVars: 2,
				statsDesc: [
					"Gold Granted",
					"Items Looted"
				]
			}
		]
	}
];

module.exports = Keystones;