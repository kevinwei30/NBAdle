import { PLAYER_NAMES } from '../constants/player_names'
import { VALIDGUESSES } from '../constants/validGuesses'
import { INFOS } from '../constants/player_info'

const special_parts = ['II', 'III', 'IV', 'Jr']

const GUESSES = VALIDGUESSES.map((x) => {
  var x_split = x.split(' ')
  if (special_parts.includes(x_split[x_split.length - 1]))
    return x_split[x_split.length - 2].toUpperCase()
  else return x_split[x_split.length - 1].toUpperCase()
})

export const isWordInWordList = (word: string) => {
  return GUESSES.includes(word)
  // WORDS.includes(word.toLowerCase()) ||
  // VALIDGUESSES.includes(word.toLowerCase())
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const interval = msInDay / 2
  const index = Math.floor((now - epochMs) / interval)
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
  }
}

export const { player_name, solution, solutionIndex, tomorrow, hints } =
  getWordOfDay()

export const maskGuess = (word: string, round: number) => {
  const residue = round % 2
  var masked_word = ''
  word.split('').forEach((letter, i) => {
    if (i % 2 === residue) masked_word += letter
    else masked_word += ' '
  })
  return masked_word
}
