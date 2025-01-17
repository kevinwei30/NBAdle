import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import classNames from 'classnames'
import { similarWord } from '../../lib/words'

type Props = {
  isOpen: boolean
  message: string
  guess?: string
  variant?: 'success' | 'warning'
}

export const Alert = ({
  isOpen,
  message,
  guess = '',
  variant = 'warning',
}: Props) => {
  const classes = classNames(
    'fixed top-5 left-1/2 transform -translate-x-1/2 max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
    {
      'bg-rose-200': variant === 'warning',
      'bg-blue-200 z-20': variant === 'success',
    }
  )
  const similar_word = similarWord(guess)
  if (similar_word) message += `, maybe you mean "${similar_word}" ?`

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-300 transition"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={classes}>
        <div className="p-4">
          <p className="text-sm text-center font-medium text-gray-900">
            <b>{message}</b>
          </p>
        </div>
      </div>
    </Transition>
  )
}
