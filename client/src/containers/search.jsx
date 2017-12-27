import React from 'react';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.nameRegex = new XRegExp('^[0-9\\p{L} _\\.]+$');
		this.nameHistory = Cookies.get('hist') || '';
		this.state = {
			name: this.nameHistory,
			region: 'na',
			invalid: false
		};
	}

	validName(summonerName) {
		return XRegExp.test(summonerName, this.nameRegex);
	}

	onInput(e) {
		this.setState({ name: e.target.value });
	}

	onSelect(e) {
		this.setState({ region: e.target.value });
	}

	runOnEnter(e) {
		if (e.key === 'Enter') this.run();
	}

	run() {
		var region = this.state.region;
		var summonerName = this.state.name;

		if (this.validName(summonerName)) {
			Cookies.set('hist', summonerName, { expires: 365 });
			window.location.href = 'http://localhost:5000/summoner?name=' + summonerName + '&region=' + region;
		}
		else {
			this.setState({ invalid: true });
			setTimeout(() => {
				this.setState({ invalid: false });
			}, 2000);
		}
	}

	render() {
		return (
			<div id="input-box">
				<input
					id="summoner-name-input"
					placeholder={this.nameHistory || "Summmoner Name"}
					onChange={e => this.onInput(e)}
					onKeyPress={e => this.runOnEnter(e)}
				/>
				<div
					id="invalid-name-box"
					style={{ opacity: this.state.invalid ? '1' : '0' }}
				>
					Invalid summoner name!
				</div>
				<select
					id="region-select"
					value={this.state.region}
					onChange={e => this.onSelect(e)}
				>
					<option value="na">NA</option>
					<option value="euw">EUW</option>
					<option value="eune">EUNE</option>
					<option value="lan">LAN</option>
					<option value="las">LAS</option>
					<option value="kr">KR</option>
					<option value="br">BR</option>
					<option value="jp">JP</option>
					<option value="oce">OCE</option>
					<option value="ru">RU</option>
					<option value="tr">TR</option>
					<option value="pbe">PBE</option>
				</select>
				<button id="search-btn" onClick={e => this.run(e)}>Go</button>
			</div>
		);
	}
}

module.exports = Search;
