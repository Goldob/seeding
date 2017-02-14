'use strict'

const {ceil, log2, pow} = Math

module.exports = {
  fair,
  randomized
}

function fair (contestants) {
  if (!contestants.length) return []

  const nRounds = ceil(log2(contestants.length))
  const nSlots = pow(2, nRounds)
  const slots = Array(nSlots)
  slots[0] = 0

  for (let depth = 1; depth <= nRounds; depth++) {
    const layerCapacity = pow(2, depth)
    const distanceUnit = nSlots / layerCapacity

    for (let i = 0; i < layerCapacity; i += 2) {
      slots[(i + 1) * distanceUnit] = slots[i * distanceUnit] + layerCapacity / 2
    }
  }

  return Array.apply(null, {length: nSlots / 2}).map((x, i) => [
    getContestantAtSlot(2 * i),
    getContestantAtSlot(2 * i + 1)
  ])

  function getContestantAtSlot (slot) {
    return slots[slot] < contestants.length ? contestants[slots[slot]] : null
  }
}

function randomized (contestants) {
  const contestantsCopy = contestants.slice(0)

  // Shuffle contestantsCopy with Fisher-Yates Shuffle
  for (let i = contestantsCopy.length - 1; i > 0; --i) {
    let j = Math.floor(Math.random() * (i + 1))
    swap(contestantsCopy, i, j)
  }

  return fair(contestantsCopy)

  function swap (array, i, j) {
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
