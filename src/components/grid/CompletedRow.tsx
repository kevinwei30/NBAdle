import { getGuessStatuses } from '../../lib/statuses'
import { solution } from '../../lib/words'
// import { Cell } from './Cell'
import { CompletedCell } from './CompletedCell'
import { MAX_WORD_LENGTH } from '../../constants/settings'

type Props = {
  guess: string
  hardMode: boolean
  round: number
}

export const CompletedRow = ({ guess, hardMode, round }: Props) => {
  if (guess.replace('-', '') === solution)
    hardMode = false
  guess = guess.padEnd(MAX_WORD_LENGTH, '-')
  const statuses = getGuessStatuses(guess)
  const residue = round % 2
  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => {
        if (hardMode) {
          if (i % 2 === residue)
            return <CompletedCell key={i} value={letter} status={statuses[i]} hardMode={hardMode} />
          else
            return <CompletedCell key={i} value={letter} hardMode={hardMode} />
        } else {
          return <CompletedCell key={i} value={letter} status={statuses[i]} hardMode={hardMode} />
        }
      })}
    </div>
  )
}
