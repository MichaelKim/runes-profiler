import React from 'react';
import { render } from 'react-dom';

import Search from '../containers/search.jsx';
import Footer from '../containers/footer.jsx';

render(
	<React.Fragment>
		<div id="bg-image" class="blur" />
		<div id="center">
			<div id="landing" class="fadein">
				<h1 class="title">Runes Profiler</h1>
				<div class="body">
					<p>Confused about new runes? Wondered about how well you use your runes compared to everyone else? Type in your summoner name to find out!</p>
				</div>
				<Search />
			</div>
		</div>
		<Footer />
	</React.Fragment>,
    document.getElementById('root')
);
