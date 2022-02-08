import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess an NBA player last name in 8 tries. The answer is less than or
        equal to 10 letters, so <b> Antetokounmpo </b>
        will never be the answer.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Special characters like " . " and " ' " will be ignored, so " O'Neal "
        should be " ONeal ".
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        After each guess, the color of the tiles will change to show how close
        your guess was to the word.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="C" status="correct" />
        <Cell value="U" />
        <Cell value="R" />
        <Cell value="R" />
        <Cell value="Y" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter C is in the word and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="J" />
        <Cell value="A" />
        <Cell value="M" status="present" />
        <Cell value="E" />
        <Cell value="S" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter M is in the word but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="J" />
        <Cell value="O" />
        <Cell value="K" />
        <Cell value="I" status="absent" />
        <Cell value="C" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter I is not in the word in any spot.
      </p>
    </BaseModal>
  )
}
