import React from 'react';
import PropTypes from 'prop-types';

const AccentRow = ({ left, mid, right, bold }) => (
	<tr>
		{left ? <td style={ bold ? { fontWeight: '700' } : {}}>{left}</td> : null}
		<td>{mid}</td>
		<td style={ !bold ? { fontWeight: '700' } : {}}>{right}</td>
	</tr>
);

AccentRow.propTypes = {
	left: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
	mid: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
	right: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
	bold: PropTypes.bool.isRequired
};

module.exports = AccentRow;