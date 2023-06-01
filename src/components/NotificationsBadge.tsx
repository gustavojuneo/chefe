import clsx from 'clsx'
import { Bell } from 'lucide-react'

type BadgeProps = {
  size?: 12 | 16 | 18 | 24 | 32 | 64
  quantity: number
  className?: string
  bgColor?: string
}
export const NotificationsBadge = ({
  size,
  quantity,
  className,
  bgColor,
}: BadgeProps) => {
  return (
    <div className="flex items-center justify-center relative">
      {quantity > 0 && (
        <span
          style={{
            width: size,
            height: size,
          }}
          className={clsx(
            'flex items-center justify-center absolute top-0 px-1 py-[0.125rem] translate-x-1/2 -translate-y-1/2 rounded-full text-[0.6875rem] font-bold',
            'animate-slideBadgeUpAndFade',
            className,
            {
              'w-4': quantity.toString().length === 1,
              'h-4': quantity.toString().length === 1,
              'right-0': quantity.toString().length >= 2,
              'right-1': quantity.toString().length === 1,
              [`${bgColor}`]: true,
            },
          )}
        >
          <span
            className={clsx(
              'absolute h-full w-full animate-pingBadge rounded-full -z-10 ',
              {
                [`${bgColor}`]: true,
              },
            )}
          />
          {quantity > 99 ? '99+' : quantity}
        </span>
      )}
      <Bell size={24} />
    </div>
  )
}
