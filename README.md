# runes-profiler
Riot Games API Challenge 2017 - Runes Reforged

# Plan

## Questions
- Single page app or multiple?

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
	- [ ] Cache summoner data into database & update profile button
- Want to add
	- Champion stats
		- [ ] Popular runes (popular rune page?)
		- [ ] Winrate per rune (highest winrate rune page?)
		- [ ] Recommended rune page
	- [ ] Store history of searches (cookies)
	- [ ] Store favourite profiles (cookies)
	- Basic profile
		- [ ] Rank
		- [ ] Summoner icon
		- [ ] Winrate
		- [ ] Winrate per champion
		- [ ] Match history
- Extra features
	- [ ] Rune page builder
	- [ ] Share rune pages
	- [ ] Animated champion banners (see lolking champion pages)
		- Done by displaying .mp4 video

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
