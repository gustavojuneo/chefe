import clsx from 'clsx'
import { LucideIcon } from 'lucide-react'
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  LegacyRef,
  forwardRef,
} from 'react'

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  isLoading?: boolean
  leftIcon?: LucideIcon
  label?: string
  errorMessage?: string
}

export const Input = forwardRef(
  (
    {
      isLoading,
      leftIcon,
      label,
      name,
      disabled,
      errorMessage,
      ...rest
    }: InputProps,
    ref: LegacyRef<HTMLInputElement> | undefined,
  ) => {
    const Icon = leftIcon
    const id = `input-${name}`

    return isLoading ? (
      <div className="animate-pulse flex flex-col gap-1">
        {label && (
          <div className="bg-slate-200 self-start rounded">
            <label className="invisible">{label}</label>
          </div>
        )}
        <div className="w-full">
          <input
            type="text"
            className="w-full p-2 pl-8 bg-slate-200 rounded border-2"
            disabled
          />
        </div>
      </div>
    ) : (
      <div className="flex flex-col gap-1">
        {!!label && (
          <label htmlFor={id} className="text-zinc-800">
            {label}
          </label>
        )}
        <div id={id} className="relative w-full">
          {Icon && (
            <span className="absolute left-2 top-[50%] -translate-y-1/2 text-zinc-400 peer-focus:text-red-500 transition">
              <Icon size={18} />
            </span>
          )}
          <input
            ref={ref}
            className={clsx(
              'w-full border-2 border-zinc-200 p-2 rounded outline-none peer transition text-zinc-800',
              {
                'pl-8': !!Icon,
                'disabled:opacity-80': disabled,
                'cursor-not-allowed': disabled,
                'focus:border-blue-400 focus:placeholder:text-blue-400':
                  !errorMessage,
                'border-red-500 placeholder:text-red-400': !!errorMessage,
              },
            )}
            disabled={disabled}
            name={name}
            {...rest}
          />
          <span className="h-[24px] text-red-500 block">{errorMessage}</span>
        </div>
      </div>
    )
  },
)

Input.displayName = 'Input'
