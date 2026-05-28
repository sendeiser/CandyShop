import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { BlobShape } from '../ui/Decorations'
import type { Category } from '../../types'

interface Props {
  categories: Category[]
}

const gradients = ['from-[#26c6da] to-[#4dd3e0]', 'from-[#8bc34a] to-[#aed581]', 'from-[#ec4899] to-[#f472b6]', 'from-[#1a3a2e] to-[#2d4a3e]']

const positions = [
  { top: '0%', left: '0%', size: 'h-28 w-28 sm:h-36 sm:w-36', delay: '0s' },
  { top: '15%', left: '35%', size: 'h-24 w-24 sm:h-32 sm:w-32', delay: '0.2s' },
  { top: '5%', left: '68%', size: 'h-20 w-20 sm:h-28 sm:w-28', delay: '0.4s' },
  { top: '55%', left: '15%', size: 'h-20 w-20 sm:h-28 sm:w-28', delay: '0.1s' },
  { top: '45%', left: '55%', size: 'h-24 w-24 sm:h-32 sm:w-32', delay: '0.3s' },
]

export default function CategoriesGrid({ categories }: Props) {
  const sectionRef = useScrollReveal()

  if (categories.length === 0) {
    return (
      <section className="bg-[#faf6f5] px-6 py-16 text-center text-gray-400">
        Cargando categorias...
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#faf8f5] px-6 py-20 sm:px-12 lg:px-20">
      <div className="pointer-events-none absolute inset-0">
        <BlobShape className="absolute -right-20 -top-20 h-[400px] w-[400px] animate-blob-slow" color="#26c6da" opacity={0.06} />
        <div className="hidden sm:block">
          <BlobShape className="absolute -bottom-32 -left-20 h-[350px] w-[350px] animate-blob" color="#ec4899" opacity={0.05} style={{ animationDelay: '3s' }} />
          <svg className="absolute inset-0 h-full w-full opacity-[0.04]" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <pattern id="garden-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#1a3a2e" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#garden-dots)" />
          </svg>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-[#1a3a2e] sm:text-4xl">
            Categor&iacute;as
          </h2>
          <p className="mt-1 text-base text-[#8d6e63]">
            Eleg&iacute; por tipo
          </p>
        </div>

        <div className="relative mt-16 hidden md:block" style={{ height: '420px' }}>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 420" preserveAspectRatio="none">
            <path d="M100,210 C300,160 400,260 600,210 C800,160 900,260 1100,210" stroke="#8bc34a" strokeWidth="2" fill="none" opacity="0.3" className="garden-line" />
            <path d="M200,100 C400,80 500,180 700,120 C900,60 1000,160 1100,100" stroke="#26c6da" strokeWidth="1.5" fill="none" opacity="0.2" className="garden-line" />
            <line x1="350" y1="350" x2="600" y2="300" stroke="#ec4899" strokeWidth="1" opacity="0.15" className="garden-line" />
            <line x1="600" y1="300" x2="850" y2="200" stroke="#8bc34a" strokeWidth="1" opacity="0.15" className="garden-line" />
          </svg>

          {categories.slice(0, 5).map((cat, i) => {
            const pos = positions[i % positions.length]
            return (
              <Link
                key={cat.id}
                to={`/${cat.slug}`}
                className="garden-item absolute"
                style={{ top: pos.top, left: pos.left, animation: `fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${pos.delay} both` }}
              >
                <div className={`${pos.size} flex flex-col items-center justify-center rounded-full bg-gradient-to-br ${gradients[i % gradients.length]} p-1 shadow-lg transition-all duration-300 hover:scale-110`}>
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white/20 sm:backdrop-blur-sm">
                    {cat.image_url ? (
                      <img src={cat.image_url} alt={cat.name} className="h-3/5 w-3/5 rounded-full object-cover" loading="lazy" decoding="async" />
                    ) : (
                      <span className="text-2xl font-bold text-white/70">{cat.name.charAt(0)}</span>
                    )}
                    <span className="mt-0.5 text-[10px] font-bold tracking-wide text-white uppercase sm:text-xs">
                      {cat.name}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:hidden">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/${cat.slug}`}
              className="flex flex-col items-center gap-3 rounded-2xl bg-white p-4 shadow-sm"
            >
              {cat.image_url ? (
                <div className="h-20 w-20 overflow-hidden rounded-full">
                  <img src={cat.image_url} alt={cat.name} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                </div>
              ) : (
                <div className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${gradients[i % gradients.length]}`}>
                  <span className="text-xl font-bold text-white/60">{cat.name.charAt(0)}</span>
                </div>
              )}
              <span className="text-sm font-semibold text-[#1a3a2e]">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
