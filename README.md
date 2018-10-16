# Runes Profiler

Check out the demo at [runes-profiler.michaelkim.me](https://runes-profiler.michaelkim.me)!

Runes Profiler is an entry for [Riot Games API Challenge 2017](https://discussion.developer.riotgames.com/articles/4395/the-riot-games-api-challenge-2017.html). It is an web app that compares player rune stats from recent games to global stats.

The goal of this project is to help players understand their rune usages by comparing their stats with global stats.

## Overview

Runes Profiler takes the last 20 games of a player, and calculates the winrates and average stats for each rune used by the player in those matches. It then displays these stats alongside the global average stats of those runes. In addition, Runes Profiler also collects champion stats, and shows the highest winrate keystones and rune pages.

To efficiently collect more data, all the other players in those 20 games are also analyzed and added to the global stats. Similarly, champion stats are also taken indirectly when player stats are retrieved.

To prevent sending too many requests, a player's stats won't be updated if they have been last searched within 5 minutes.

## Development

Runes Profiler requires a Riot Games API key and a Firebase API key to run. Create a file in the root folder named `.env` and add the following keys:
- `FIREBASE_KEY`: Firebase API key
- `FIREBASE_URL`: URL to Firebase database
- `RIOT_API`: Riot Games API key

To build and run,

- `npm install`
  - This will also build a production version of the client pages using webpack.
- `npm start`

To run in development mode,
- `npm install`
- `npm run dev`

### Technologies

Runes Profiler is built with a React / webpack frontend and a Node / Express backend, using a Firebase database. In the early stages of development, I spent a lot of time reorganizing the code and trying out various other tools, such as Postgres and MongoDB for the database, and Marko and Pug for templating. In the end, I needed to prioritize getting a working product in time. I decided to use the tools that I had experience in to save time learning the tools and quickly prototype.

### Challenges

1. I developed all of Runes Profiler using a development API key, so I was constrained under the rate limit. I used mock data to save API calls, especially when developing the UI, but it did give less flexibility during development.
2. Being rate limited also meant I can't collect more information for a player. Currently, Runes Profiler grabs the last 20 games, but extending that to 100 games would improve its rune analysis.
3. I learned about the challenge one week after it started through a friend. There were a lot of other features I wanted to add, and the UI could have been more polished than I had hoped.
4. With more time, I would have switched Firebase with a more robust database tool like Postgres or MongoDB. Also, I would have used some sort of CSS modules along with React to make it more modular, rather than putting all the CSS into one file.
5. The global and champion stats are collected whenever a player's stats is updated. To make sure multiple copies of data aren't added to the global and champion stats (i.e. when searching a summoner twice), all of the previous data of the player is stored and subtracted from the global stats before adding the player's updated data. This increases the size of the database, but ensures that the global and champion stats are correct.

## Disclaimer

Runes Profiler isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
