import React from 'react';
import PropTypes from 'prop-types';

import PathSelector from './pathselector.jsx';
import PathDisplay from './pathdisplay.jsx';

import Runes from './runes.json';

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
