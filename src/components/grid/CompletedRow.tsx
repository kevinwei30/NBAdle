import { getGuessStatuses } from '../../lib/statuses'
import { solution, maskGuess } from '../../lib/words'
import { Cell } from './Cell'
import { MAX_WORD_LENGTH } from '../../constants/settings'

type Props = {
  guess: string
  hardMode: boolean
  round: number
}

export const CompletedRow = ({ guess, hardMode, round }: Props) => {
  if (guess.replace('-', '') === solution) hardMode = false
  const residue = round % 2
  var masked_guess = ''
  if (hardMode) {
    masked_guess = maskGuess(guess, round)
  } else {
    masked_guess = guess
  }
  guess = guess.padEnd(MAX_WORD_LENGTH, '-')
  const statuses = getGuessStatuses(masked_guess)
  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => {
        if (hardMode) {
          if (i % 2 === residue)
            return <Cell key={i} value={letter} status={statuses[i]} />
          else return <Cell key={i} value={letter} />
        } else {
          return <Cell key={i} value={letter} status={statuses[i]} />
        }
      })}
    </div>
  )
}
