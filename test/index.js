'use-strict'

const {ceil, floor, log2, pow, max} = Math

const test = require('tape')
const seeding = require('../')

test('seeding.fair()', (t) => {
  const N = 64

  // Generate array [1, 2, 3, ..., N]
  const contestants = Array.apply(null, {length: N}).map((x, index) => index + 1)

  let matches = seeding.fair(contestants)

  // Check if all contestants are present in first round's matches
  let remaining = N
  const appearanceBitmap = Array.apply(null, {length: N}).map(() => false)
  matches.forEach((match) => {
    match.forEach((participant) => {
      if (participant) {
        if (!appearanceBitmap[participant]) {
          appearanceBitmap[participant] = true
          remaining--
        } else t.fail('should not place a contestant in two different matches')
      }
    })
  })

  if (remaining) t.fail('should not exclude any contestants from the tournament')

  const numRounds = ceil(log2(N))
  let round = 0
  while (++round <= numRounds) {
    const roundsUntilFinal = numRounds - round
    const maxContestantsInRound = pow(2, roundsUntilFinal + 1)

    let nextRoundMatches = Array.apply(null, {length: matches.length / 2}).map(() => [null, null])
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i]
      if (!match[0] && !match[1]) t.fail('should not produce empty matches')

      if (max.apply(null, match) > maxContestantsInRound) {
        t.fail('should allow `n` best contestants meet exactly `log2(n)` rounds before final')
      }

      // Choose expected winner based on initial ordering
      const winner = match[1] === null || match[1] > match[0]
        ? match[0] : match[1]
      if (roundsUntilFinal) nextRoundMatches[floor(i / 2)][i % 2] = winner
    }

    matches = nextRoundMatches
  }

  if (matches.length) t.fail('should produce a balanced bracket tree')

  t.pass('works as expected')
  t.end()
})
