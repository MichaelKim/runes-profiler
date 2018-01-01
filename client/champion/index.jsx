import React from 'react';
import { render } from 'react-dom';
import QueryString from 'querystring';

import App from './app.jsx';
import Header from '../containers/header.jsx';
import Footer from '../containers/footer.jsx';

import championNames from './champNames.json';

const name = QueryString.parse(window.location.search.slice(1)).name;

if (name && !championNames[name.replace(/\s+/g, '').toLowerCase()]) {
	window.location.href = '/champion';
}

render(
	name ?
		<App
			name={name}
		/> :
		<React.Fragment>
			<Header />
	    	<div id='center'>
	    		<div style={{ margin: '0 auto 50px auto', width: '1000px', textAlign: 'center' }}>
	    			<h1>Champion Search</h1>
	    			<p>Select a champion below to view winning runes!</p>
	    			{
	    				Object.values(championNames).map(c => (
	    					<img
	    						style={{ width: '75px', height: '75px', cursor: 'pointer' }}
	    						src={'../assets/champion/' + c + '.png'}
	    						onClick={() => window.location.href = '/champion?name=' + c}
	    						key={c}
	    					/>
	    				))
	    			}
				</div>
			</div>
	    	<Footer />
		</React.Fragment>
	,
    document.getElementById('root')
);
