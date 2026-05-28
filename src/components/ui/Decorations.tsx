export function BlobShape({ className = '', color = '#7ec8e3', opacity = 0.15, style }: { className?: string; color?: string; opacity?: number; style?: React.CSSProperties }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path
        d="M200 10C260 10 310 40 340 90C370 140 390 190 380 240C370 290 340 330 290 360C240 390 190 400 140 380C90 360 50 320 30 270C10 220 0 170 20 120C40 70 90 30 140 20C160 10 180 10 200 10Z"
        fill={color}
        opacity={opacity}
      />
    </svg>
  )
}

export function BlobShape2({ className = '', color = '#ffb3d0', opacity = 0.1, style }: { className?: string; color?: string; opacity?: number; style?: React.CSSProperties }) {
  return (
    <svg className={className} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path
        d="M250 30C320 20 390 60 420 130C450 200 440 280 400 340C360 400 290 430 220 450C150 470 80 450 40 390C0 330 -20 240 10 170C40 100 120 60 190 40C210 35 230 32 250 30Z"
        fill={color}
        opacity={opacity}
      />
    </svg>
  )
}

export function LeafShape({ className = '', color = '#69f0ae', opacity = 0.2, style }: { className?: string; color?: string; opacity?: number; style?: React.CSSProperties }) {
  return (
    <svg className={className} viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path
        d="M50 5C65 20 85 40 90 65C95 90 85 115 70 135C55 155 35 145 20 125C5 105 -5 80 2 55C9 30 30 15 50 5Z"
        fill={color}
        opacity={opacity}
      />
      <path d="M50 5L50 80" stroke={color} strokeWidth="2" opacity={opacity * 1.5} />
    </svg>
  )
}

export function DotsPattern({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="3" fill="#7ec8e3" opacity="0.15" />
      <circle cx="50" cy="10" r="2" fill="#ffb3d0" opacity="0.12" />
      <circle cx="90" cy="10" r="3" fill="#69f0ae" opacity="0.15" />
      <circle cx="130" cy="10" r="2" fill="#7ec8e3" opacity="0.1" />
      <circle cx="170" cy="10" r="3" fill="#ffb3d0" opacity="0.12" />
      <circle cx="30" cy="40" r="2" fill="#69f0ae" opacity="0.12" />
      <circle cx="70" cy="40" r="3" fill="#7ec8e3" opacity="0.1" />
      <circle cx="110" cy="40" r="2" fill="#ffb3d0" opacity="0.15" />
      <circle cx="150" cy="40" r="3" fill="#69f0ae" opacity="0.1" />
      <circle cx="190" cy="40" r="2" fill="#7ec8e3" opacity="0.12" />
      <circle cx="10" cy="80" r="3" fill="#ffb3d0" opacity="0.1" />
      <circle cx="50" cy="80" r="2" fill="#7ec8e3" opacity="0.15" />
      <circle cx="90" cy="80" r="3" fill="#69f0ae" opacity="0.12" />
      <circle cx="130" cy="80" r="2" fill="#ffb3d0" opacity="0.1" />
      <circle cx="170" cy="80" r="3" fill="#7ec8e3" opacity="0.12" />
      <circle cx="30" cy="120" r="2" fill="#69f0ae" opacity="0.15" />
      <circle cx="70" cy="120" r="3" fill="#ffb3d0" opacity="0.1" />
      <circle cx="110" cy="120" r="2" fill="#7ec8e3" opacity="0.12" />
      <circle cx="150" cy="120" r="3" fill="#69f0ae" opacity="0.1" />
      <circle cx="190" cy="120" r="2" fill="#ffb3d0" opacity="0.15" />
      <circle cx="10" cy="160" r="2" fill="#7ec8e3" opacity="0.12" />
      <circle cx="50" cy="160" r="3" fill="#69f0ae" opacity="0.1" />
      <circle cx="90" cy="160" r="2" fill="#ffb3d0" opacity="0.15" />
      <circle cx="130" cy="160" r="3" fill="#7ec8e3" opacity="0.12" />
      <circle cx="170" cy="160" r="2" fill="#69f0ae" opacity="0.1" />
    </svg>
  )
}
