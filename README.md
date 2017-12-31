# Runes Profiler

Check out the demo at [runes-profiler.herokuapp.com](https://runes-profiler.herokuapp.com)!

Runes Profiler is an entry for [Riot Games API Challenge 2017](https://discussion.developer.riotgames.com/articles/4395/the-riot-games-api-challenge-2017.html). It is an web app that compares player rune stats from recent games to global stats.

The goal of this project is to help players understand their rune usages by comparing their stats with global stats.

## Overview

Runes Profiler takes the last 20 games of a player, and calculates the winrates and average stats for each rune used by the player in those matches. It then displays these stats alongside the global average stats of those runes.

In addition, Runes Profiler also collects champion stats, and shows the highest winrate keystones and rune pages.

## Development

To build and run,
- `npm install`
- In separate windows, run `node ./server/index.js` and `npm run build`

### Technologies

Runes Profiler is built with a React / webpack frontend and a Node / Express backend, using a Firebase database. In the early stages of development, I spent a lot of time reorganizing the code and trying out various other tools, such as Postgres and MongoDB for the database, and Marko and Pug for templating. In the end, I decided to use those tools since I've them before in previous projects so I was comfortable using them, but also I had little time to work with so learning how to use new tools would cut into development time. Despite this, 

### Challenges

1. I developed all of Runes Profiler using a development API key, so I was contrained under the rate limit. I used mock data to save API calls, especially when developing the UI, but it did give less flexibility during development.
2. Being rate limited also meant I can't collect more information for a player. Currently, Runes Profiler grabs the last 20 games, but extending that to 100 games would improve its rune analysis.
3. I learned about the challenge one week after it started through a friend. There were a lot of other features I wanted to add, and the UI could have been more polished than I had hoped.
4. With more time, I would have switched Firebase with a more robust database tool like Postgres or MongoDB. Also, I would have used some sort of CSS modules along with React to make it more modular, rather than putting all the CSS into one file.

## Disclaimer

Runes Profiler isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.