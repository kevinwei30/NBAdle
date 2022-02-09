import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'

type Props = {
  value?: string
  status?: CharStatus
  hardMode: boolean
}

export const CompletedCell = ({ value, status, hardMode }: Props) => {
  const classes = classnames(
    'w-10 h-10 border-solid border-2 flex items-center justify-center mx-0.5 text-3xl font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600 text-2xl':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      'shadowed bg-green-500 text-white border-green-500': status === 'correct',
      'shadowed bg-yellow-500 dark:bg-yellow-700 text-white border-yellow-500 dark:border-yellow-700':
        status === 'present',
      'shadowed bg-blue-500 dark:bg-blue-500 text-white border-blue-500 dark:border-blue-500':
        hardMode === true && status && status !== 'absent',
      'cell-animation': !!value,
    }
  )

  return <div className={classes}>{value}</div>
}
