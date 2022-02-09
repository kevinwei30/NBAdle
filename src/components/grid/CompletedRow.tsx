import { getGuessStatuses } from '../../lib/statuses'
// import { Cell } from './Cell'
import { CompletedCell } from './CompletedCell'

type Props = {
  guess: string,
  hardMode: boolean
}

export const CompletedRow = ({ guess, hardMode }: Props) => {
  const statuses = getGuessStatuses(guess)

  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => {
        return <CompletedCell key={i} value={letter} status={statuses[i]} hardMode={hardMode} />
        // if (i % 2 === 0)
        //   return <CompletedCell key={i} value={letter} status={statuses[i]} hardMode={hardMode} />
        // else
        //   return <CompletedCell key={i} value={letter} hardMode={hardMode} />
      })}
    </div>
  )
}
