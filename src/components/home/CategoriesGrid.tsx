import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { Category } from '../../types'

const wrapperColors: { bg: string; from: string; to: string; emoji: string; shadow: string }[] = [
  { bg: '#ff2a75', from: '#ff2a75', to: '#ff6b9d', emoji: '🍬', shadow: 'rgba(255,42,117,0.35)' },
  { bg: '#cddc39', from: '#cddc39', to: '#d4e157', emoji: '🍭', shadow: 'rgba(205,220,57,0.35)' },
  { bg: '#556b2f', from: '#556b2f', to: '#6b8e23', emoji: '🍫', shadow: 'rgba(85,107,47,0.35)' },
  { bg: '#ff6d00', from: '#ff6d00', to: '#ff9100', emoji: '🍩', shadow: 'rgba(255,109,0,0.35)' },
]

interface Props {
  categories: Category[]
}

export default function CategoriesGrid({ categories }: Props) {
  const sectionRef = useScrollReveal()

  if (categories.length === 0) {
    return (
      <section className="bg-vanilla px-6 py-16 text-center text-gray-400">
        Cargando categorias...
      </section>
    )
  }

  const displayCats = categories.slice(0, 4)

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-vanilla px-6 py-20 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-chocolate sm:text-4xl">
            Categorías
          </h2>
          <p className="mt-1 text-base text-caramel">
            Elegí por tipo
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6">
          {displayCats.map((cat, i) => {
            const c = wrapperColors[i % wrapperColors.length]
            return (
              <Link
                key={cat.id}
                to={`/${cat.slug}`}
                className="group relative block"
              >
                <div
                  className="wrapper-card relative overflow-hidden rounded-2xl transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                    boxShadow: `0 8px 32px ${c.shadow}`,
                  }}
                >
                  <div className="wrapper-twist-top absolute left-0 right-0 top-0 h-6" />
                  <div className="wrapper-twist-bottom absolute bottom-0 left-0 right-0 h-6" />

                  <div className="relative flex flex-col items-center px-6 py-10 sm:py-14">
                    <span className="mb-3 text-5xl transition-transform duration-300 group-hover:scale-110 sm:text-6xl" aria-hidden="true">
                      {c.emoji}
                    </span>
                    <h3 className="text-center text-xl font-bold text-white sm:text-2xl" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", textShadow: '0 1px 3px rgba(0,0,0,0.15)' }}>
                      {cat.name}
                    </h3>
                    {cat.description && (
                      <p className="mt-1.5 text-center text-sm text-white/80">
                        {cat.description}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30">
                      Ver más
                      <span className="text-xs">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
