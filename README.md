# seeding: seeding alogrithm for single-elimination tournaments
[![Build Status](https://travis-ci.org/Goldob/seeding.svg?branch=master)](https://travis-ci.org/Goldob/hh-mm-ss)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

:trophy: Generate seeding based on team ordering in qualifications.

```js
var seeding = require('seeding')

var qualificationResults = [
  'Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5', 'Team 6'
]

seeding.fair(qualificationResults)
/*
 * [  ['Team 1', 'Team 5'],
 *    ['Team 3', null],
 *    ['Team 2', 'Team 6'],
 *    ['Team 4', null]  ]
 */
```

## Main principles

Here is how  [Wikipedia](https://en.wikipedia.org/wiki/Single-elimination_tournament#Seeding) summarizes the need of seeding:
> Opponents may be allocated randomly (such as in the FA Cup); however, since the "luck of the draw" may result in the highest-rated competitors being scheduled to face each other early in the competition, seeding is often used to prevent this. Brackets are set up so that the top two seeds could not possibly meet until the final round (should both advance that far), none of the top four can meet prior to the semifinals, and so on. If no seeding is used, the tournament is called a random knockout tournament.

This library's goal is to generate a seeding that will result in a balanced tournament bracket. The seeding is guaranteed to satisfy two requirements:

* none of the top `n` teams will meet until `log2(n)` rounds before final (as described above),
* the resulting bracket tree will be balanced, i.e. the number of rounds will be minimal.

## Usage

### `seeding.fair(contestants)`

Generate match pairings for the first round that will result in a tournament bracket satisfying conditions listed above.

#### Parameters

* `contestants` array of contenstants, ordered by their results in qualifications. The item types representing individual contestants do not matter, but can't be `null`.

#### Returns

* an array of match pairings, wich each pairing being a 2-element array of items from `constestants`. At most one of the members in a pairing might be `null` - it means that the other will pass to the second round without playing a match.

### `seeding.randomized(contestants)`

A variation of `seeding.fair(contestants)` that starts with shuffling the `contestants` array. This is usefult in cases when no qualifications were present, but the even distribution of matches is still desired.

#### Parameters

* `contestants` array of contenstants. The item types representing individual contestants do not matter, but can't be `null`.

#### Returns

* an array of match pairings, wich each pairing being a 2-element array of items from `constestants`. At most one of the members in a pairing might be `null` - it means that the other will pass to the second round without playing a match.

## Install

`npm install seeding --save`

## License

MIT
