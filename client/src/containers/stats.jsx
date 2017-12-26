import React from 'react';
import PropTypes from 'prop-types';

import Profile from './profile.jsx';

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
	}
];

const Stats = ({ data }) => {
	const keystones = Runes.reduce((acc, tree) => {
		return acc.concat(
			<h3>{ tree.name }</h3>,
			tree.keystones.reduce((acc, rune) => {
				if (data.playerData[rune.id]) return acc.concat(<h4>{ rune.name }</h4>);
				return acc;
			}, [])
		);
	}, []);

	return (
		<div id="center">
			<div id="stats" className="fadein">
				<Profile
					image='../assets/profile-icon.png'
					name={data.player.name}
				/>
				<h2>Keystones</h2>
				{ keystones }
			</div>
		</div>
	);
}

Stats.propTypes = {
	data: PropTypes.object.isRequired
};

module.exports = Stats;