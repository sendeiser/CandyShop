import { cn } from '../../lib/utils'

const candyColors: Record<string, string> = {
  pink: '#ffb3c6',
  yellow: '#fff176',
  green: '#a8e6cf',
  blue: '#b3d9ff',
  purple: '#d4b3ff',
  orange: '#ffcc80',
}

const flavorColors = ['pink', 'yellow', 'green', 'blue', 'purple', 'orange']

interface CandyIllustrationProps {
  size?: number
  flavor?: string
  className?: string
}

export default function CandyIllustration({
  size = 120,
  flavor,
  className,
}: CandyIllustrationProps) {
  const colorKey = flavor ?? flavorColors[Math.floor(Math.random() * flavorColors.length)]
  const color = candyColors[colorKey] ?? candyColors.pink

  return (
    <div className={cn('inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Candy illustration">
        <ellipse cx="50" cy="58" rx="24" ry="28" fill={color} />
        <circle cx="50" cy="38" r="18" fill={color} />
        <circle cx="36" cy="24" r="8" fill={color} />
        <circle cx="64" cy="24" r="8" fill={color} />
        <circle cx="43" cy="35" r="2.5" fill="#3e2723" />
        <circle cx="57" cy="35" r="2.5" fill="#3e2723" />
        <path d="M45 42 Q50 48 55 42" fill="none" stroke="#3e2723" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="26" cy="54" rx="6" ry="10" fill={color} transform="rotate(-20 26 54)" />
        <ellipse cx="74" cy="54" rx="6" ry="10" fill={color} transform="rotate(20 74 54)" />
        <ellipse cx="38" cy="82" rx="8" ry="5" fill={color} />
        <ellipse cx="62" cy="82" rx="8" ry="5" fill={color} />
      </svg>
    </div>
  )
}
