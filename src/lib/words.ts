// import { WORDS } from '../constants/wordlist'
import { AS_NAMES } from '../constants/as_names'
import { VALIDGUESSES } from '../constants/validGuesses'
import { INFOS } from '../constants/player_info'

const GUESSES = VALIDGUESSES.map(x => {
  var x_split = x.split(' ')
  return x_split[x_split.length - 1].toUpperCase()
})

export const isWordInWordList = (word: string) => {
  return (
    GUESSES.includes(word)
    // WORDS.includes(word.toLowerCase()) ||
    // VALIDGUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  // const index = Math.floor(Math.random() * WORDS.length)
  const nextday = (index + 1) * msInDay + epochMs
  // const name = WORDS[index % WORDS.length]
  const name = AS_NAMES[index % AS_NAMES.length]
  const name_split = name.split(' ')
  const first_name = name_split[0]
  const last_name = name_split[name_split.length - 1]
  const answer = last_name.toUpperCase()
  const info = INFOS[name as keyof typeof INFOS]
  const infos = [
    `Answer Length : ${answer.length}`,
    `Play Team : ${info.team}`,
    `First Name : ${first_name}`
  ]

  return {
    solution: answer,
    solutionIndex: index,
    tomorrow: nextday,
    hints: infos
  }
}

export const { solution, solutionIndex, tomorrow, hints } = getWordOfDay()
