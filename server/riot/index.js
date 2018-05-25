const https = require('https');
const XRegExp = require('xregexp');
const nameRegex = new XRegExp('^[0-9\\p{L} _\\.]+$');

function query(path, region, query) {
  return new Promise((resolve, reject) => {
    const qp = query ? query : '';
    console.log('Querying riot:', path, region, qp);
    https
      .get('https://' + region + '.api.riotgames.com' + path + '?api_key=' + process.env.RIOT_API + qp, res => {
        let rawData = '';

        res.on('data', chunk => (rawData += chunk));
        res.on('end', () => {
          if (res.statusCode === 200) {
            const jsonData = JSON.parse(rawData);
            resolve(jsonData);
          } else {
            try {
              const jsonData = JSON.parse(rawData);
              if (jsonData && jsonData.status && jsonData.status_code) {
                reject(jsonData.status_code);
              }
            } catch (e) {
              reject('Invalid JSON');
            }
          }
        });
      })
      .on('error', e => {
        console.error(e.message);
        reject(e.message);
      });
  });
}

function getSummoner(summonerName, region) {
  return query('/lol/summoner/v3/summoners/by-name/' + summonerName, region);
}

function getMatches(accountId, region) {
  return query('/lol/match/v3/matchlists/by-account/' + accountId, region, '&endIndex=20').then(data => data.matches);
}

function getMatch(matchId, region, callback) {
  return query('/lol/match/v3/matches/' + matchId, region);
}

function getPlayersData(accountId, region) {
  return getMatches(accountId, region).then(matches => {
    const promises = matches.map(m => getMatch(m.gameId, region));
    return Promise.all(promises).then(matchesData => {
      const playersData = {};

      matchesData.forEach(match => {
        match.participantIdentities.forEach(p => {
          const playerId = p.participantId;
          const part = match.participants.find(q => q.participantId === playerId);

          const stripName = getStripName(p.player.summonerName);

          if (!playersData[stripName]) {
            playersData[stripName] = {
              name: p.player.summonerName,
              icon: p.player.profileIcon,
              lastUpdated: p.player.accountId === accountId ? Date.now() : 0,
              runes: {},
              champions: {}
            };
          }

          // Runes
          let page = '';
          for (let i = 0; i < 6; i++) {
            const runeId = part.stats['perk' + i];
            let runeData = playersData[stripName].runes;

            if (!runeData[runeId]) {
              runeData[runeId] = {
                wins: 0,
                games: 0,
                stats: [0, 0, 0]
              };
            }

            if (part.stats.win) runeData[runeId].wins++;
            runeData[runeId].games++;
            for (let j = 0; j < runeData[runeId].stats.length; j++) {
              runeData[runeId].stats[j] += part.stats['perk' + i + 'Var' + (j + 1)];
            }

            if (page) page += '@';
            page += runeId;
          }

          // Champions
          let champData = playersData[stripName].champions;
          const keystoneId = part.stats.perk0;

          if (!champData[part.championId]) {
            champData[part.championId] = {
              keystones: {},
              pages: {}
            };
          }

          if (!champData[part.championId].keystones[keystoneId]) {
            champData[part.championId].keystones[keystoneId] = {
              wins: 0,
              games: 0
            };
          }
          if (part.stats.win) champData[part.championId].keystones[keystoneId].wins++;
          champData[part.championId].keystones[keystoneId].games++;

          if (!champData[part.championId].pages[page]) {
            champData[part.championId].pages[page] = {
              wins: 0,
              games: 0
            };
          }
          if (part.stats.win) champData[part.championId].pages[page].wins++;
          champData[part.championId].pages[page].games++;
        });
      });

      return playersData;
    });
  });
}

function validName(summonerName) {
  return XRegExp.test(summonerName, nameRegex);
}

function getStripName(summonerName) {
  return summonerName.replace(/\s+/g, '').toLowerCase();
}

function getRegionEndpoint(region) {
  return (
    {
      br: 'br1',
      eune: 'eun1',
      euw: 'euw1',
      jp: 'jp1',
      kr: 'kr',
      lan: 'la1',
      las: 'la2',
      na: 'na1',
      oce: 'oc1',
      tr: 'tr1',
      ru: 'ru',
      pbe: 'pbe1'
    }[region] || null
  );
}

module.exports = {
  getSummoner,
  validName,
  getStripName,
  getPlayersData,
  getRegionEndpoint
};
