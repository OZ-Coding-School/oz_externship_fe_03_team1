import { useEffect, useState } from 'react'
import clsx from 'clsx'

type ButtonColorVariant = {
  bg: string
  text: string
  bd?: string
}

type ButtonColorSet = {
  default: ButtonColorVariant
  hover: ButtonColorVariant
  active: ButtonColorVariant
}

const BUTTON_COLORS: Record<string, ButtonColorSet> = {
  primary: {
    default: { bg: 'bg-primary-500', text: 'text-white' },
    hover: { bg: 'bg-primary-600', text: 'text-white' },
    active: { bg: 'bg-primary-700', text: 'text-white' },
  },

  secondary: {
    default: { bg: 'bg-gray-100', text: 'text-gray-900' },
    hover: { bg: 'bg-gray-200', text: 'text-gray-900' },
    active: { bg: 'bg-gray-300', text: 'text-white' },
  },

  outline: {
    default: {
      bg: 'bg-white',
      bd: 'border border-gray-300',
      text: 'text-gray-700',
    },
    hover: {
      bg: 'bg-gray-50',
      bd: 'border border-gray-300',
      text: 'text-gray-700',
    },
    active: {
      bg: 'bg-gray-100',
      bd: 'border border-gray-400',
      text: 'text-gray-900',
    },
  },

  ghost: {
    default: { bg: 'bg-transparent', text: 'text-gray-700' },
    hover: { bg: 'bg-gray-50', text: 'text-gray-700' },
    active: { bg: 'bg-gray-100', text: 'text-gray-900' },
  },

  danger: {
    default: { bg: 'bg-danger-500', text: 'text-white' },
    hover: { bg: 'bg-danger-600', text: 'text-white' },
    active: { bg: 'bg-danger-800', text: 'text-white' },
  },
} as const
// loading, disabled의 경우 default에 투명도 50% 스타일 적용
// 피그마 색상 기반으로 작성

// 프롭스 및 타입
type ButtonProps = {
  type?: keyof typeof BUTTON_COLORS
  size?: ButtonSize
  disabled?: boolean
  isLoading?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  className?: string
}

type ButtonSize = 'small' | 'medium' | 'large'

type ButtonStatus = 'default' | 'hover' | 'active' | 'disabled' | 'loading'

// 버튼 컴포넌트
// 로딩 디자인 해야됨 > text와 동일한 색상?
// Spinner 라이브러리 고려
export function BasicButton({
  type = 'primary',
  size = 'medium',
  disabled = false,
  isLoading = false,
  onClick,
  children,
  className = '',
}: ButtonProps) {
  const [status, setStatus] = useState<ButtonStatus>(
    isLoading ? 'loading' : disabled ? 'disabled' : 'default'
  )

  const isInteractive = !isLoading && !disabled

  useEffect(() => {
    if (isLoading) setStatus('loading')
    else if (disabled) setStatus('disabled')
    else setStatus('default')
  }, [isLoading, disabled])

  const colorSet =
    BUTTON_COLORS[type][status as keyof (typeof BUTTON_COLORS)[typeof type]] ||
    BUTTON_COLORS[type].default

  const sizeMap = {
    small: 'px-2 h-8 text-sm',
    medium: 'px-3 h-10 text-base',
    large: 'px-4 h-12 text-lg',
  }

  const buttonClass = clsx(
    'flex items-center justify-center rounded-lg font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary-400 focus:outline-none',
    sizeMap[size],
    colorSet.bg,
    colorSet.text,
    colorSet.bd ?? '',
    {
      'opacity-50 cursor-not-allowed':
        status === 'loading' || status === 'disabled',
    }
  )

  return (
    <button
      type="button"
      aria-disabled={!isInteractive}
      aria-busy={isLoading}
      onClick={isInteractive ? onClick : undefined}
      onMouseEnter={() => isInteractive && setStatus('hover')}
      onMouseLeave={() => isInteractive && setStatus('default')}
      onMouseDown={() => isInteractive && setStatus('active')}
      onMouseUp={() => isInteractive && setStatus('hover')}
      className={buttonClass + className}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Spinner className={colorSet.text} /> 로딩중...
        </span>
      ) : (
        children
      )}
    </button>
  )
}

// 스피너
// 제대로 작동 되는지 확인 필요
export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={clsx('h-4 w-4 animate-spin', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  )
}
