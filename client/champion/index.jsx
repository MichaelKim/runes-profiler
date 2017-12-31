import React from 'react';
import { render } from 'react-dom';

import App from './app.jsx';
import Header from '../containers/header.jsx';
import Footer from '../containers/footer.jsx';

const name = getQueryVariable('name');

const championNames = ["Aatrox","Ahri","Akali","Alistar","Amumu","Anivia","Annie","Ashe","AurelionSol","Azir","Bard","Blitzcrank","Brand","Braum","Caitlyn","Camille","Cassiopeia","Chogath","Corki","Darius","Diana","DrMundo","Draven","Ekko","Elise","Evelynn","Ezreal","Fiddlesticks","Fiora","Fizz","Galio","Gangplank","Garen","Gnar","Gragas","Graves","Hecarim","Heimerdinger","Illaoi","Irelia","Ivern","Janna","JarvanIV","Jax","Jayce","Jhin","Jinx","Kalista","Karma","Karthus","Kassadin","Katarina","Kayle","Kayn","Kennen","Khazix","Kindred","Kled","KogMaw","Leblanc","LeeSin","Leona","Lissandra","Lucian","Lulu","Lux","Malphite","Malzahar","Maokai","MasterYi","MissFortune","MonkeyKing","Mordekaiser","Morgana","Nami","Nasus","Nautilus","Nidalee","Nocturne","Nunu","Olaf","Orianna","Ornn","Pantheon","Poppy","Quinn","Rakan","Rammus","RekSai","Renekton","Rengar","Riven","Rumble","Ryze","Sejuani","Shaco","Shen","Shyvana","Singed","Sion","Sivir","Skarner","Sona","Soraka","Swain","Syndra","TahmKench","Taliyah","Talon","Taric","Teemo","Thresh","Tristana","Trundle","Tryndamere","TwistedFate","Twitch","Udyr","Urgot","Varus","Vayne","Veigar","Velkoz","Vi","Viktor","Vladimir","Volibear","Warwick","Xayah","Xerath","XinZhao","Yasuo","Yorick","Zac","Zed","Ziggs","Zilean","Zoe","Zyra"];

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
	    				championNames.map(c => (
	    					<img
	    						style={{ width: '75px', height: '75px', cursor: 'pointer' }}
	    						src={'../assets/champion/' + c + '.png'}
	    						onClick={() => window.location.href = 'http://localhost:5000/champion?name=' + c}
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
