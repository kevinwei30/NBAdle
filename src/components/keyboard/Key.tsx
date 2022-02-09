import { ReactNode } from 'react'
import classnames from 'classnames'
import { KeyValue } from '../../lib/keyboard'
import { CharStatus } from '../../lib/statuses'

type Props = {
  children?: ReactNode
  value: KeyValue
  width?: number
  status?: CharStatus
  onClick: (value: KeyValue) => void
  hardMode: boolean
}

export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
  hardMode,
}: Props) => {
  const classes = classnames(
    'flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none dark:text-white',
    {
      'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400':
        !status,
      'bg-slate-400 dark:bg-slate-800 text-white': status === 'absent',
      'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white':
        status === 'correct',
      'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 dark:bg-yellow-700 text-white':
        status === 'present',
      'bg-blue-500 hover:bg-blue-600 active:bg-blue-500 dark:bg-blue-500 text-white':
        hardMode === true && status && status !== 'absent',
    }
  )

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  return (
    <button
      style={{ width: `${width}px`, height: '58px' }}
      className={classes}
      onClick={handleClick}
    >
      {children || value}
    </button>
  )
}
