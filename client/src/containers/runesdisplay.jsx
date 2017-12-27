import React from 'react';
import PropTypes from 'prop-types';

import PathSelector from './pathselector.jsx';
import PathDisplay from './pathdisplay.jsx';

class RunesDisplay extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedPath: 0
		};
	}

	render() {
		return (
			<div>
				<div style={{ textAlign: 'center' }}>
					<h2 style={{ margin: '5px' }}>Your Runes Reforged</h2>
				</div>
				<div id="runes">
					<PathSelector
						pathNames={Runes.map(t => t.name)}
						onSelect={i => {
							this.setState({ selectedPath: i });
							this.props.onSelect(i);
						}}
					/>
					{
						Runes.map((t, i) =>
							<PathDisplay
								tree={t}
								data={this.props.data}
								color={colors[i]}
								selected={this.state.selectedPath === i}
								key={i}
							/>
						)
					}
				</div>
			</div>
		);
	}
}

RunesDisplay.propTypes = {
	data: PropTypes.object.isRequired,
	onSelect: PropTypes.func.isRequired
};

module.exports = RunesDisplay;

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
		runes: [
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
			},
			{
				name: 'Overheal',
				id: 9101,
				statsVars: 1,
				statsDesc: [
					"Total Shielding"
				]
			},
			{
				name: 'Triumph',
				id: 9111,
				statsVars: 1,
				statsDesc: [
					"Total Health Restored"
				]
			},
			{
				name: 'Presence of Mind',
				id: 8009,
				statsVars: 1,
				statsDesc: [
					"Total Mana Restored"
				]
			},
			{
				name: 'Legend: Alacrity',
				id: 9104,
				statsVars: 1,
				statsDesc: [
					"Time Completed"
				]
			},
			{
				name: 'Legend: Tenacity',
				id: 9105,
				statsVars: 1,
				statsDesc: [
					"Time Completed"
				]
			},
			{
				name: 'Legend: Bloodline',
				id: 9103,
				statsVars: 1,
				statsDesc: [
					"Time Completed"
				]
			},
			{
				name: 'Coup de Grace',
				id: 8014,
				statsVars: 1,
				statsDesc: [
					"Total Bonus Damage"
				]
			},
			{
				name: 'Cut Down',
				id: 8017,
				statsVars: 1,
				statsDesc: [
					"Total Bonus Damage"
				]
			},
			{
				name: 'Last Stand',
				id: 8299,
				statsVars: 1,
				statsDesc: [
					"Total Bonus Damage"
				]
			}
		]
	},
	{
		name: 'Domination',
		runes: [
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
			},
			{
				name: 'Cheap Shot',
				id: 8126,
				statsVars: 1,
				statsDesc: [
					"Total Damage"
				]
			},
			{
				name: 'Taste of Blood',
				id: 8139,
				statsVars: 1,
				statsDesc: [
					"Total Healing"
				]
			},
			{
				name: 'Sudden Impact',
				id: 8143,
				statsVars: 1,
				statsDesc: [
					"Total Damage"
				]
			},
			{
				name: 'Zombie Ward',
				id: 8136,
				statsVars: 1,
				statsDesc: [
					"Wards Corrupted"
				]
			},
			{
				name: 'Ghost Poro',
				id: 8120,
				statsVars: 1,
				statsDesc: [
					"Poros Spawned"
				]
			},
			{
				name: 'Eyeball Collection',
				id: 8138,
				statsVars: 1,
				statsDesc: [
					"Total Bonus AD/AP"
				]
			},
			{
				name: 'Ravenous Hunter',
				id: 8135,
				statsVars: 1,
				statsDesc: [
					"Total Stacks"
				]
			},
			{
				name: 'Ingenious Hunter',
				id: 8134,
				statsVars: 1,
				statsDesc: [
					"Total Stacks"
				]
			},
			{
				name: 'Relentless Hunter',
				id: 8105,
				statsVars: 1,
				statsDesc: [
					"Total Stacks"
				]
			}
		]
	},
	{
		name: 'Sorcery',
		runes: [
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
			},
			{
				name: 'Nullifying Orb',
				id: 8224,
				statsVars: 1,
				statsDesc: [
					"Total Shield Granted"
				]
			},
			{
				name: 'Manaflow Band',
				id: 8226,
				statsVars: 1,
				statsDesc: [
					"Total Resource Refunded"
				]
			},
			{
				name: 'The Ultimate Hat',
				id: 8243,
				statsVars: 1,
				statsDesc: [
					"Total Bonus CDR"
				]
			},
			{
				name: 'Transcendence',
				id: 8210,
				statsVars: 1,
				statsDesc: [
					"Total Adaptive Stat Gained"
				]
			},
			{
				name: 'Celerity',
				id: 8234,
				statsVars: 1,
				statsDesc: [
					"Total Bonus AD/AP"
				]
			},
			{
				name: 'Absolute Force',
				id: 8233,
				statsVars: 1,
				statsDesc: [
					"Total Time Active"
				]
			},
			{
				name: 'Scorch',
				id: 8237,
				statsVars: 1,
				statsDesc: [
					"Total Bonus AD/AP"
				]
			},
			{
				name: 'Waterwalking',
				id: 8232,
				statsVars: 1,
				statsDesc: [
					"Total Bonus AD/AP"
				]
			},
			{
				name: 'Gathering Storm',
				id: 8236,
				statsVars: 1,
				statsDesc: [
					"Total Bonus AD/AP"
				]
			}
		]
	},
	{
		name: 'Resolve',
		runes: [
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
			},
			{
				name: 'Unflinching',
				id: 8242,
				statsVars: 1,
				statsDesc: [
					"Bonus Tenacity per Activation"
				]
			},
			{
				name: 'Demolish',
				id: 8446,
				statsVars: 1,
				statsDesc: [
					"Total Bonus Damage"
				]
			},
			{
				name: 'Font of Life',
				id: 8463,
				statsVars: 1,
				statsDesc: [
					"Total Ally Healing"
				]
			},
			{
				name: 'Iron Skin',
				id: 8430,
				statsVars: 1,
				statsDesc: [
					"Percent of Game Active"
				]
			},
			{
				name: 'Mirror Shell',
				id: 8435,
				statsVars: 1,
				statsDesc: [
					"Bonus Magic Resist"
				]
			},
			{
				name: 'Conditioning',
				id: 8429,
				statsVars: 3,
				statsDesc: [
			        "Percent of Game Active",
			        "Bonus Armor",
			        "Bonus Magic Resist"
				]
			},
			{
				name: 'Overgrowth',
				id: 8451,
				statsVars: 1,
				statsDesc: [
        			"Total Bonus Max Health"
				]
			},
			{
				name: 'Revitalize',
				id: 8453,
				statsVars: 2,
				statsDesc: [
			        "Bonus Healing",
			        "Bonus Shielding"
				]
			},
			{
				name: 'Second Wind',
				id: 8444,
				statsVars: 1,
				statsDesc: [
					"Total Healing"
				]
			}
		]
	},
	{
		name: 'Inspiration',
		runes: [
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
			},
			{
				name: 'Hextech Flashtraption',
				id: 8306,
				statsVars: 1,
				statsDesc: [
					"Times Hexflashed"
				]
			},
			{
				name: 'Biscuit Delivery',
				id: 8345,
				statsVars: 1,
				statsDesc: [
					"Biscuits Received"
				]
			},
			{
				name: 'Perfect Timing',
				id: 8313,
				statsVars: 0,
				statsDesc: []
			},
			{
				name: 'Magical Footware',
				id: 8304,
				statsVars: 1,
				statsDesc: [
        			"Boots Arrival Time"
				]
			},
			{
				name: "Future's Market",
				id: 8321,
				statsVars: 1,
				statsDesc: [
        			"Future Purchases"
				]
			},
			{
				name: 'Minion Dematerializer',
				id: 8316,
				statsVars: 1,
				statsDesc: [
        			"Bonus Minion Damage Dealt"
				]
			},
			{
				name: 'Cosmic Insight',
				id: 8347,
				statsVars: 0,
				statsDesc: []
			},
			{
				name: 'Approach Velocity',
				id: 8410,
				statsVars: 1,
				statsDesc: [
        			"Time Spent Hasted"
				]
			},
			{
				name: 'Celestial Body',
				id: 8339,
				statsVars: 0,
				statsDesc: []
			}
		]
	}
];
