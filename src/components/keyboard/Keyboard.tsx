import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { solution, maskGuess } from '../../lib/words'
import { Key } from './Key'
import { useEffect } from 'react'
import { ENTER_TEXT, DELETE_TEXT } from '../../constants/strings'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[]
  hardMode: boolean
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  guesses,
  hardMode,
}: Props) => {
  if (hardMode) {
    var new_guesses: string[] = []
    guesses.forEach((word, round) => {
      if (word === solution) {
        new_guesses.push(word)
      } else {
        new_guesses.push(maskGuess(word, round))
      }
    })
    guesses = new_guesses
  }
  const charStatuses = getStatuses(guesses)

  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else if (e.code === 'Space') {
        onChar(' ')
      } else {
        const key = e.key.toUpperCase()
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div>
      <div className="flex justify-center mb-1">
        <Key
          value="Q"
          onClick={onClick}
          status={charStatuses['Q']}
          hardMode={hardMode}
        />
        <Key
          value="W"
          onClick={onClick}
          status={charStatuses['W']}
          hardMode={hardMode}
        />
        <Key
          value="E"
          onClick={onClick}
          status={charStatuses['E']}
          hardMode={hardMode}
        />
        <Key
          value="R"
          onClick={onClick}
          status={charStatuses['R']}
          hardMode={hardMode}
        />
        <Key
          value="T"
          onClick={onClick}
          status={charStatuses['T']}
          hardMode={hardMode}
        />
        <Key
          value="Y"
          onClick={onClick}
          status={charStatuses['Y']}
          hardMode={hardMode}
        />
        <Key
          value="U"
          onClick={onClick}
          status={charStatuses['U']}
          hardMode={hardMode}
        />
        <Key
          value="I"
          onClick={onClick}
          status={charStatuses['I']}
          hardMode={hardMode}
        />
        <Key
          value="O"
          onClick={onClick}
          status={charStatuses['O']}
          hardMode={hardMode}
        />
        <Key
          value="P"
          onClick={onClick}
          status={charStatuses['P']}
          hardMode={hardMode}
        />
      </div>
      <div className="flex justify-center mb-1">
        <Key
          value="A"
          onClick={onClick}
          status={charStatuses['A']}
          hardMode={hardMode}
        />
        <Key
          value="S"
          onClick={onClick}
          status={charStatuses['S']}
          hardMode={hardMode}
        />
        <Key
          value="D"
          onClick={onClick}
          status={charStatuses['D']}
          hardMode={hardMode}
        />
        <Key
          value="F"
          onClick={onClick}
          status={charStatuses['F']}
          hardMode={hardMode}
        />
        <Key
          value="G"
          onClick={onClick}
          status={charStatuses['G']}
          hardMode={hardMode}
        />
        <Key
          value="H"
          onClick={onClick}
          status={charStatuses['H']}
          hardMode={hardMode}
        />
        <Key
          value="J"
          onClick={onClick}
          status={charStatuses['J']}
          hardMode={hardMode}
        />
        <Key
          value="K"
          onClick={onClick}
          status={charStatuses['K']}
          hardMode={hardMode}
        />
        <Key
          value="L"
          onClick={onClick}
          status={charStatuses['L']}
          hardMode={hardMode}
        />
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick} hardMode={hardMode}>
          {ENTER_TEXT}
        </Key>
        <Key
          value="Z"
          onClick={onClick}
          status={charStatuses['Z']}
          hardMode={hardMode}
        />
        <Key
          value="X"
          onClick={onClick}
          status={charStatuses['X']}
          hardMode={hardMode}
        />
        <Key
          value="C"
          onClick={onClick}
          status={charStatuses['C']}
          hardMode={hardMode}
        />
        <Key
          value="V"
          onClick={onClick}
          status={charStatuses['V']}
          hardMode={hardMode}
        />
        {/*<Key width={130.8} value=" " onClick={onClick} status={charStatuses[' ']}>
          {SPACE_TEXT}
        </Key>*/}
        <Key
          value="B"
          onClick={onClick}
          status={charStatuses['B']}
          hardMode={hardMode}
        />
        <Key
          value="N"
          onClick={onClick}
          status={charStatuses['N']}
          hardMode={hardMode}
        />
        <Key
          value="M"
          onClick={onClick}
          status={charStatuses['M']}
          hardMode={hardMode}
        />
        <Key width={65.4} value="DELETE" onClick={onClick} hardMode={hardMode}>
          {DELETE_TEXT}
        </Key>
      </div>
    </div>
  )
}
