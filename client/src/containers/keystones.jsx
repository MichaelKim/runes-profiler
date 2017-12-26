import React from 'react';
import PropTypes from 'prop-types';

import Keystone from './keystone.jsx';

class Keystones extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedTree: 0
		};

		this.keystonesTop = Runes.map((t, i) => 
			<div id={t.name.toLowerCase() + '-button'} key={i} onClick={e => this.selectTree(e)}>
				{t.name}
			</div>
		);

		this.keystonesBox = Runes.map((t, i) =>
			t.keystones.map((k, j) =>
				<Keystone
					keystone={k}
					color={colors[i]}
					playerData={this.props.data.playerData[k.id]}
					globalData={this.props.data.globalData[k.id]}
					key={j}
				/>
			)
		);
	}

	selectTree(e) {
		let id = 0;
		switch (e.target.id) {
			case 'precision-button':   id = 0; break;
			case 'domination-button':  id = 1; break;
			case 'sorcery-button':     id = 2; break;
			case 'resolve-button':     id = 3; break;
			case 'inspiration-button': id = 4; break;
		}
		this.setState({ selectedTree: id });
	}

	render() {
		return (
			<div>
				<div style={{ textAlign: 'center' }}>
					<h2 style={{ margin: '5px' }}>KEYSTONES</h2>
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

module.exports = Keystones;

const colors = [
	'rgba(126, 101, 31, 0.6)',
	'rgba(122, 5, 31, 0.6)',
	'rgba(10, 15, 89, 0.6)',
	'rgba(15, 97, 3, 0.6)',
	'rgba(19, 95, 106, 0.6)'
];

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
