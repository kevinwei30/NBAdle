import { WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'
import { INFOS } from '../constants/player_info'

const GUESSES = VALIDGUESSES.map(x => x.toUpperCase())

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word) || GUESSES.includes(word)
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
  const word = WORDS[index % WORDS.length]
  const answer = word.toUpperCase()
  const info = INFOS[word as keyof typeof INFOS]
  const infos = [
    `Total Length : ${word.length}`,
    `Play Teams : ${info.teams}`,
    `First Name : ${word.split(' ')[0]}`
  ]

  return {
    solution: answer,
    solutionIndex: index,
    tomorrow: nextday,
    hints: infos
  }
}

export const { solution, solutionIndex, tomorrow, hints } = getWordOfDay()
