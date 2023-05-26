import clsx from 'clsx'
import { HTMLAttributes } from 'react'

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  circle?: boolean
  disabled?: boolean
}

export const Button = ({
  children,
  className,
  circle = false,
  disabled = false,
  ...rest
}: ButtonProps) => {
  const classNames = clsx(
    'p-2 flex items-center gap-2 text-white transition',
    className,
    {
      'rounded-full': circle,
      rounded: !circle,
      'disabled:opacity-50': disabled,
    },
  )
  return (
    <button disabled={disabled} className={classNames} {...rest}>
      {children}
    </button>
  )
}
