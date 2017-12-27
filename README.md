# runes-profiler
Riot Games API Challenge 2017 - Runes Reforged

# Plan

## Things to Do
- Change `/player` endpoint to POST
	- Add `bodyparser` and use url encoded middleware
- Add Disclaimer
	- "[The title of your Project] isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc."
- Come up with a title
- Refactor `runedisplay.jsx`

## Questions

## Goals
- Compare a player's runes usage with averages (other players)
	- Averages by champion / rank / global (all games, anyone who ran that rune)
	- Win rate for each runes
- Rune page statistics per champion
	- Popular
	- Winrate
	- Recommended? (grab this from somewhere like reddit idk)

## Timeline
- Required
	- [x] Grab recent match data of summoner
	- Parse data into:
		- [x] Winrates per rune
		- [x] Average stats per rune
		- [ ] Winrates per rune & champion
		- [ ] Average stats per rune & champion
	- [x] Setup database
	- [x] Store match data
	- Grab specific data from database
		- [x] Winrates per rune
		- [x] Average stats per rune
		- [ ] Winrates per rune & champion
		- [ ] Average stats per rune & champion
	- [x] Cache summoner data into database & update profile button (no need)
- Want to add
	- Champion stats
		- [ ] Popular runes (popular rune page?)
		- [ ] Winrate per rune (highest winrate rune page?)
		- [ ] Recommended rune page
	- [x] Store history of searches (cookies)
	- [ ] Store favourite profiles (cookies)
	- Basic profile
		- [ ] Rank
		- [x] Summoner icon
		- [ ] Winrate
		- [ ] Winrate per champion
		- [ ] Match history
	- [ ] Style the scrollbar
- Extra features
	- [ ] Rune page builder
	- [ ] Share rune pages
	- [ ] Animated champion banners (see lolking champion pages)
		- Done by displaying .mp4 video
	- [ ] Animate landing background (grab from youtube video)

## Usage

### Main page
- Summoner name input
- Region dropdown menu
- Stores previously searched names (cookies)

### On enter
- Grabs user's last 20 games (if possible, 100)
- Filters match data, for each match:
	- Champion played
	- Won / lost
	- Rune page
