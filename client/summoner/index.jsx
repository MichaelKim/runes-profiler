import React from 'react';
import { render } from 'react-dom';
import App from './app.jsx';

render(
	<App
		name={getQueryVariable('name')}
		region={getQueryVariable('region')}	
	/>,
    document.getElementById('root')
);

function getQueryVariable(variable) {
	const query = window.location.search.substring(1);
	const vars = query.split("&");
	for (let i=0; i<vars.length; i++) {
		const pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return null;
}
