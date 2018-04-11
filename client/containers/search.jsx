import React from 'react';
import XRegExp from 'xregexp';
import Cookies from 'js-cookie';

const regions = [
  'NA',
  'EUW',
  'EUNE',
  'LAN',
  'LAS',
  'KR',
  'BR',
  'JP',
  'OCE',
  'RU',
  'TR',
  'PBE'
];

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.nameRegex = XRegExp('^[0-9\\p{L} _\\.]+$');
    this.state = {
      name: Cookies.get('hist') || 'Summmoner Name',
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
    const { region, name } = this.state;

    if (this.validName(name)) {
      Cookies.set('hist', name, { expires: 365 });
      window.location.href = '/summoner?name=' + name + '&region=' + region;
    } else {
      this.setState({ invalid: true });
      setTimeout(() => {
        this.setState({ invalid: false });
      }, 2000);
    }
  }

  render() {
    const { name, invalid, region } = this.state;

    return (
      <div id="input-box">
        <input
          id="summoner-name-input"
          placeholder={name}
          onChange={e => this.onInput(e)}
          onKeyPress={e => this.runOnEnter(e)}
        />
        <div id="invalid-name-box" style={{ opacity: invalid ? '1' : '0' }}>
          Invalid summoner name!
        </div>
        <select
          id="region-select"
          value={region}
          onChange={e => this.onSelect(e)}
        >
          {regions.map(r => (
            <option key={r} value={r.toLowerCase()}>
              {r}
            </option>
          ))}
        </select>
        <button id="search-btn" onClick={e => this.run(e)}>
          Go
        </button>
      </div>
    );
  }
}

module.exports = Search;
