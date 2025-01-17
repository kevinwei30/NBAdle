import {
  InformationCircleIcon,
  ChartBarIcon,
  SunIcon,
  MoonIcon,
  LightBulbIcon,
  TrashIcon,
  EyeIcon,
  EyeOffIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { HintsModal } from './components/modals/HintsModal'
import {
  GAME_TITLE,
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  ABOUT_GAME_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  CORRECT_WORD_MESSAGE,
  PLAYER_NAME_MESSAGE,
} from './constants/strings'
import { MAX_WORD_LENGTH, MAX_CHALLENGES } from './constants/settings'
import {
  isWordInWordList,
  isWinningWord,
  solution,
  player_name,
  isRandomMode,
} from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  clearGameStateFromLocalStorage,
} from './lib/localStorage'

import './App.css'

const ALERT_TIME_MS = 2000

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isHintsModalOpen, setIsHintsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [isHardMode, setIsHardMode] = useState(false)
  const [successAlert, setSuccessAlert] = useState('')
  const [failAlert, setFailAlert] = useState('')
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  const handleHardMode = (isHard: boolean) => {
    setIsHardMode(isHard)
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      setSuccessAlert(
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)] +
          PLAYER_NAME_MESSAGE(player_name)
      )
      setTimeout(() => {
        setSuccessAlert('')
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS * 2)
    }
    if (isGameLost) {
      setFailAlert(
        CORRECT_WORD_MESSAGE(solution) + PLAYER_NAME_MESSAGE(player_name)
      )
      setTimeout(() => {
        setFailAlert('')
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS * 2)
    }
  }, [isGameWon, isGameLost])

  const onChar = (value: string) => {
    if (
      currentGuess.length < MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    // if (!(currentGuess.length === MAX_WORD_LENGTH)) {
    if (!(currentGuess.length > 1)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    const winningWord = isWinningWord(currentGuess)

    if (
      // currentGuess.length === MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        if (!isRandomMode)
          setStats(addStatsForCompletedGame(stats, guesses.length))
        setIsHardMode(false)
        return setIsGameWon(true)
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        if (!isRandomMode)
          setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        return setIsGameLost(true)
      }

      if ([2, 4, 6].includes(guesses.length)) {
        setIsHintsModalOpen(true)
      }
    }
  }

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-2 mt-4">
        <h1 className="text-xl ml-2.5 grow font-bold dark:text-white">
          {GAME_TITLE}
        </h1>
        {isDarkMode ? (
          <SunIcon
            className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
            onClick={() => handleDarkMode(!isDarkMode)}
          />
        ) : (
          <MoonIcon
            className="h-6 w-6 mr-2 cursor-pointer"
            onClick={() => handleDarkMode(!isDarkMode)}
          />
        )}
        <InformationCircleIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <LightBulbIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => setIsHintsModalOpen(true)}
        />
        {isHardMode ? (
          <EyeIcon
            className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
            onClick={() => handleHardMode(!isHardMode)}
          />
        ) : (
          <EyeOffIcon
            className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
            onClick={() => handleHardMode(!isHardMode)}
          />
        )}
        <ChartBarIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => setIsStatsModalOpen(true)}
        />
        <TrashIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => {
            clearGameStateFromLocalStorage()
            window.location.reload()
          }}
        />
        <SwitchHorizontalIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => {
            window.location.href = `${window.location.origin}/NBAdle${
              isRandomMode ? '' : '?mode=random'
            }`
          }}
        />
      </div>
      <div className="flex w-80 mx-auto items-center mb-4 mt-2">
        <h4 className="text-m ml-2.5 grow font-bold dark:text-white">
          {`${isRandomMode ? '(random mode)' : ''}`}
        </h4>
      </div>
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        hardMode={isHardMode}
      />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        hardMode={isHardMode}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        handleShare={() => {
          setSuccessAlert(GAME_COPIED_MESSAGE)
          return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
        isRandomMode={isRandomMode}
      />
      <HintsModal
        isOpen={isHintsModalOpen}
        handleClose={() => setIsHintsModalOpen(false)}
        guesses={guesses}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />

      <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
        onClick={() => setIsAboutModalOpen(true)}
      >
        {ABOUT_GAME_MESSAGE}
      </button>

      <Alert message={NOT_ENOUGH_LETTERS_MESSAGE} isOpen={isNotEnoughLetters} />
      <Alert
        message={WORD_NOT_FOUND_MESSAGE}
        guess={currentGuess}
        isOpen={isWordNotFoundAlertOpen}
      />
      <Alert message={failAlert} isOpen={failAlert !== ''} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
    </div>
  )
}

export default App
