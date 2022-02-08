import { hints } from '../../lib/words'
import { BaseModal } from './BaseModal'
import { HINTS_TITLE } from '../../constants/strings'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
}

export const HintsModal = ({ isOpen, handleClose, guesses }: Props) => {
  var guess_count = guesses.length
  if (guess_count >= 3) {
    if (guess_count >= 5) {
      if (guess_count >= 7) {
        return (
          <BaseModal
            title={HINTS_TITLE}
            isOpen={isOpen}
            handleClose={handleClose}
          >
            <p className="text-sm text-gray-500 dark:text-gray-300">
              1. {hints[0]}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              2. {hints[1]}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              3. {hints[2]}
            </p>
          </BaseModal>
        )
      }
      return (
        <BaseModal
          title={HINTS_TITLE}
          isOpen={isOpen}
          handleClose={handleClose}
        >
          <p className="text-sm text-gray-500 dark:text-gray-300">
            1. {hints[0]}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            2. {hints[1]}
          </p>
        </BaseModal>
      )
    }
    return (
      <BaseModal title={HINTS_TITLE} isOpen={isOpen} handleClose={handleClose}>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          1. {hints[0]}
        </p>
      </BaseModal>
    )
  }
  return (
    <BaseModal title={HINTS_TITLE} isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">No Hint Yet</p>
    </BaseModal>
  )
}
