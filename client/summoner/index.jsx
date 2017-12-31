import React from 'react';
import { render } from 'react-dom';
import QueryString from 'querystring';

import App from './app.jsx';
import Header from '../containers/header.jsx';
import Search from '../containers/search.jsx';
import Footer from '../containers/footer.jsx';

const qs = QueryString.parse(window.location.search.slice(1));
const name = qs.name;
const region = qs.region;

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
