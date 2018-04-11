import React from 'react';
import { render } from 'react-dom';

import Search from '../containers/search.jsx';
import Footer from '../containers/footer.jsx';

render(
  <div>
    <div id="bg-image" className="blur" />
    <div id="center">
      <div id="landing" className="fadein">
        <h1 className="title">Runes Profiler</h1>
        <div className="body">
          <p>
            Confused about new runes? Wondered about how well you use your runes
            compared to everyone else? Type in your summoner name to find out!
          </p>
        </div>
        <Search />
      </div>
    </div>
    <Footer />
  </div>,
  document.getElementById('root')
);
