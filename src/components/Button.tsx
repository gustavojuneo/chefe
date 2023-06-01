import clsx from 'clsx'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  circle?: boolean
  disabled?: boolean
  isLoading?: boolean
}

export const Button = ({
  children,
  className,
  circle = false,
  disabled = false,
  isLoading = false,
  ...rest
}: ButtonProps) => {
  if (isLoading) {
    return (
      <button
        disabled
        className={clsx(
          'p-2 flex items-center justify-center gap-2 transition font-medium',
          'disabled:pointer-events-none bg-slate-200 rounded animate-pulse',
          {
            'rounded-full': circle,
            rounded: !circle,
          },
        )}
      >
        <div className="invisible">{children}</div>
      </button>
    )
  }

  return (
    <button
      disabled={disabled}
      className={clsx(
        'p-2 flex items-center justify-center gap-2 transition font-medium',
        className,
        {
          'rounded-full': circle,
          rounded: !circle,
          'disabled:opacity-50': disabled,
          'cursor-not-allowed': disabled,
        },
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
