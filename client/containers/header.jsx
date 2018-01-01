import React from 'react';

import Search from './search.jsx';

const Header = () => (
	<React.Fragment>
		<div className='header-box'>
			<div className='header'>
				<a className='logo' href='/'>Runes Profiler</a>
				<Search />
			</div>
		</div>
		<div className='menu-box'>
			<div className='menu'>
				<div className='menu-item'>
					<a href='/summoner'>Summoner</a>
				</div>
				<div className='menu-item'>
					<a href='/champion'>Champion</a>
				</div>
			</div>
		</div>
    </React.Fragment>
);

module.exports = Header;
