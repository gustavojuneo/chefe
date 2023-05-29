import clsx from 'clsx'
import { LucideIcon } from 'lucide-react'
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  LegacyRef,
  forwardRef,
  useRef,
} from 'react'

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  isLoading?: boolean
  leftIcon?: LucideIcon
}

export const Input = forwardRef(
  (
    { isLoading, leftIcon, ...rest }: InputProps,
    ref: LegacyRef<HTMLInputElement> | undefined,
  ) => {
    const Icon = leftIcon

    return isLoading ? (
      <div className="animate-pulse">
        <div className="w-full">
          <input
            type="text"
            className="w-full p-2 pl-8 bg-slate-200 rounded border-2"
            disabled
          />
        </div>
      </div>
    ) : (
      <div className="relative w-full">
        {Icon && (
          <span className="absolute left-2 top-[50%] -translate-y-1/2 text-zinc-400 peer-focus:text-red-500 transition">
            <Icon size={18} />
          </span>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full border-2 border-zinc-200 p-2 rounded outline-none focus:border-red-500 focus:placeholder:text-red-400 peer transition',
            {
              'pl-8': !!Icon,
            },
          )}
          {...rest}
        />
      </div>
    )
  },
)

Input.displayName = 'Input'
