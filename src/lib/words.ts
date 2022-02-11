import { PLAYER_NAMES } from '../constants/player_names'
import { VALIDGUESSES } from '../constants/validGuesses'
import { INFOS } from '../constants/player_info'

const special_parts = ['II', 'III', 'IV', 'Jr']

const valid_words = VALIDGUESSES.map((x) => {
  var x_split = x.split(' ')
  if (special_parts.includes(x_split[x_split.length - 1]))
    return x_split[x_split.length - 2].toUpperCase()
  else return x_split[x_split.length - 1].toUpperCase()
})

export const isWordInWordList = (word: string) => {
  return valid_words.includes(word)
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const getWordOfDay = (url: string) => {
  const random = url.includes('?mode=random')
  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const interval = msInDay / 2
  const index = random
    ? Math.floor(Math.random() * PLAYER_NAMES.length)
    : Math.floor((now - epochMs) / interval)
  const nextday = (index + 1) * interval + epochMs
  const name = PLAYER_NAMES[index % PLAYER_NAMES.length]
  var name_split = name.split(' ')
  if (special_parts.includes(name_split[name_split.length - 1]))
    name_split.pop()
  const first_name = name_split[0]
  const last_name = name_split[name_split.length - 1]
  const answer = last_name.toUpperCase()
  const info = INFOS[name as keyof typeof INFOS]
  const infos = [
    `Answer Length : ${answer.length}`,
    `Play Team : ${info.team}`,
    `First Name : ${first_name}`,
  ]

  return {
    player_name: name,
    solution: answer,
    solutionIndex: index,
    tomorrow: nextday,
    hints: infos,
    isRandomMode: random,
  }
}

export const {
  player_name,
  solution,
  solutionIndex,
  tomorrow,
  hints,
  isRandomMode,
} = getWordOfDay(window.location.href)

export const maskGuess = (word: string, round: number) => {
  const residue = round % 2
  var masked_word = ''
  word.split('').forEach((letter, i) => {
    if (i % 2 === residue) masked_word += letter
    else masked_word += ' '
  })
  return masked_word
}

function editDistance(s1: string, s2: string) {
  s1 = s1.toLowerCase()
  s2 = s2.toLowerCase()

  var costs = []
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i
    for (var j = 0; j <= s2.length; j++) {
      if (i === 0) costs[j] = j
      else {
        if (j > 0) {
          var newValue = costs[j - 1]
          if (s1.charAt(i - 1) !== s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
          costs[j - 1] = lastValue
          lastValue = newValue
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue
  }
  return costs[s2.length]
}

function getSimilarity(s1: string, s2: string) {
  var longer = s1
  var shorter = s2
  if (s1.length < s2.length) {
    longer = s2
    shorter = s1
  }
  var longerLength = longer.length
  if (longerLength === 0) {
    return 1.0
  }
  return (
    (longerLength - editDistance(longer, shorter)) /
    parseFloat(longerLength.toString())
  )
}

export const similarWord = (guess: string) => {
  if (guess.length === 0) return null
  var max_similarity = 0
  var similar_word = null
  valid_words.forEach((word) => {
    var similarity = getSimilarity(guess, word)
    if (similarity > max_similarity) {
      max_similarity = similarity
      similar_word = word
    }
  })
  if (max_similarity >= 0.6) {
    return similar_word
  } else {
    return null
  }
}
