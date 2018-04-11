import React from 'react';

import Search from './search.jsx';

const Header = () => (
  <div className="header-box">
    <div className="header">
      <a className="logo" href="/">
        Runes Profiler
      </a>
      <div className="menu-item">
        <a href="/summoner">Summoner</a>
      </div>
      <div className="menu-item">
        <a href="/champion">Champion</a>
      </div>
      <Search />
    </div>
  </div>
);

module.exports = Header;
