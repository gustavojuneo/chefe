import clsx from 'clsx'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
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
  return (
    <button
      disabled={disabled}
      className={clsx(
        'p-2 flex items-center justify-center gap-2 text-white transition',
        className,
        {
          'rounded-full': circle,
          rounded: !circle,
          'disabled:opacity-50': disabled,
        },
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
