import React from 'react';
import { render } from 'react-dom';

import App from './app.jsx';
import Header from '../containers/header.jsx';
import Search from '../containers/search.jsx';
import Footer from '../containers/footer.jsx';

const name = getQueryVariable('name');
const region = getQueryVariable('region');

render(
	(name && region) ?
		<App
			name={name}
			region={region}	
		/> :
		<React.Fragment>
			<Header />
	    	<div id='center' style={{ height: '85vh' }}>
	    		<div style={{ margin: '0 auto', textAlign: 'center' }}>
	    			<h1>Summoner Search</h1>
		    		<p>Enter a summoner name to view their rune stats!</p>
		    		<Search />
	    		</div>
			</div>
	    	<Footer />
    	</React.Fragment>
	,
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
