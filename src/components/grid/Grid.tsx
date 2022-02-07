import { MAX_CHALLENGES, MAX_WORD_LENGTH } from '../../constants/settings'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
// import { EmptyRow } from './EmptyRow'
import { Cell } from './Cell'

type Props = {
  guesses: string[]
  currentGuess: string
}

export const Grid = ({ guesses, currentGuess }: Props) => {
  // const empties =
  //   guesses.length < MAX_CHALLENGES - 1
  //     ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
  //     : []

  return (
    <div className="pb-6">
      <div className="flex justify-center mb-1">
        {Array.from(Array(MAX_WORD_LENGTH).keys()).map((_, i) => (
          <Cell key={i} value={(i+1).toString()} />
        ))}
      </div>
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} />
      ))}
      {guesses.length < MAX_CHALLENGES && <CurrentRow guess={currentGuess} />}
      {/*{empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}*/}
    </div>
  )
}
