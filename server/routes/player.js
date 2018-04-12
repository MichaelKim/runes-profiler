const router = require('express').Router();

const riot = require('../riot');
const db = require('../db');

router.get('/', function(req, res) {
  const summonerName = req.query.name;
  const region = riot.getRegionEndpoint(req.query.region);

  if (!riot.validName(summonerName)) {
    res.status(400);
    res.send('Invalid summoner name');
    return;
  }

  if (!region) {
    res.status(400);
    res.send('Invalid region');
    return;
  }

  console.log(summonerName, region);

  const stripName = riot.getStripName(summonerName);

  const getGlobal = db.getGlobal();
  const getPlayer = db
    .getPlayer(stripName, region)
    .then(player => {
      if (player) {
        return player;
      }
      return riot
        .getPlayer(summonerName, region)
        .then(profileData => riot.getPlayerData(profileData.accountId, region))
        .then(playersData => {
          console.log('player from riot');

          db.updatePlayers(playersData, region);

          console.log('player saved to database');

          return playersData[stripName];
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500);
      res.send(error);
    });

  Promise.all([getPlayer, getGlobal]).then(([playerData, globalData]) => {
    console.log('global data from database');
    res.send({
      profileData: {
        name: playerData.name,
        icon: playerData.icon,
        lastUpdated: playerData.lastUpdated
      },
      playerData: playerData.runes,
      globalData
    });
  });
});

module.exports = router;
