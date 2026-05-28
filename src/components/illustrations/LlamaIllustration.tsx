import { cn } from '../../lib/utils'

interface LlamaIllustrationProps {
  size?: number
  variant?: 'hero' | 'small' | 'floating'
  animated?: boolean
  className?: string
}

export default function LlamaIllustration({
  size = 200,
  variant = 'hero',
  animated = true,
  className,
}: LlamaIllustrationProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center',
        animated && variant === 'floating' && 'animate-gentle-float',
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        role="img"
        aria-label="Llama mascot"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        className={cn(animated && 'group')}
      >
        {/* Ear left */}
        <g className={animated ? 'origin-[60px_62px] transition-transform duration-700 group-hover:-rotate-6' : ''}>
          <polygon points="50,62 58,35 66,62" fill="#b8845a" />
        </g>
        {/* Ear right */}
        <g className={animated ? 'origin-[140px_62px] transition-transform duration-700 group-hover:rotate-6' : ''}>
          <polygon points="134,62 142,35 150,62" fill="#b8845a" />
        </g>

        {/* Head */}
        <ellipse cx="100" cy="80" rx="42" ry="32" fill="#c4956a" />

        {/* Snout */}
        <ellipse cx="100" cy="92" rx="20" ry="14" fill="#d4a97a" />

        {/* Eyes */}
        <circle cx="82" cy="76" r="4" fill="#1a3a2e" />
        <circle cx="118" cy="76" r="4" fill="#1a3a2e" />
        {/* Eye shine */}
        <circle cx="83" cy="74" r="1.5" fill="white" />
        <circle cx="119" cy="74" r="1.5" fill="white" />

        {/* Smile */}
        <path d="M92 92 Q100 100 108 92" fill="none" stroke="#8b6f47" strokeWidth="2" strokeLinecap="round" />

        {/* Nostrils */}
        <circle cx="95" cy="88" r="1.5" fill="#8b6f47" />
        <circle cx="105" cy="88" r="1.5" fill="#8b6f47" />

        {/* Neck */}
        <rect x="84" y="102" width="32" height="30" rx="6" fill="#c4956a" />

        {/* Poncho / Manta */}
        <g>
          <rect x="58" y="120" width="84" height="38" rx="6" fill="#e63946" />
          <rect x="58" y="128" width="84" height="6" fill="#f4a261" />
          <rect x="58" y="138" width="84" height="6" fill="#e9c46a" />
          <rect x="58" y="148" width="84" height="6" fill="#2a9d8f" />
        </g>

        {/* Legs */}
        <rect x="72" y="158" width="10" height="28" rx="4" fill="#b8845a" />
        <rect x="88" y="158" width="10" height="28" rx="4" fill="#b8845a" />
        <rect x="108" y="158" width="10" height="28" rx="4" fill="#b8845a" />
        <rect x="124" y="158" width="10" height="28" rx="4" fill="#b8845a" />
      </svg>
    </div>
  )
}
