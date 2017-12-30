# runes-profiler
Riot Games API Challenge 2017 - Runes Reforged

# Plan

## Things to Do
- Change `/player` endpoint to POST
	- Add `bodyparser` and use url encoded middleware
- Refactor `runedisplay.jsx`
- When loading `/playerr` endpoint, if the time is more than 5 minutes, fetch new data automatically (perform `/update`)
	- Could hide update button

- For each champ, show best / highest winrate rune page
- Smaller design: show stats of rune only on hover
- Change border around runes
- Compare yourself vs pros / other player / previous patches

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
