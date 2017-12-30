import React from 'react';
import PropTypes from 'prop-types';

const PathSelector = ({ pathNames, onSelect }) => (
	<div>
		{
			pathNames.map((path, i) => (
				<div id={path.toLowerCase() + '-button'} key={i} onClick={e => onSelect(i)}>
					{path}
				</div>
			))
		}
	</div>
);

PathSelector.propTypes = {
	pathNames: PropTypes.array.isRequired,
	onSelect: PropTypes.func.isRequired
};

module.exports = PathSelector;