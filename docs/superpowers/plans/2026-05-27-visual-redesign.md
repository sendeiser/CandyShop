# Rediseño Visual Candy Shop — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar Candy Shop con estilo minimalista-ilustrativo, mascota llama peruana SVG, placeholders de productos ilustrados, tipografía DM Serif Display + Inter, animaciones scroll-triggered y micro-interacciones.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, SVG inline, Google Fonts, IntersectionObserver

---

### Task 1: Crear LlamaIllustration.tsx (SVG de la mascota)

**Files:**
- Create: `src/components/illustrations/LlamaIllustration.tsx`
- Create: `src/components/illustrations/index.ts`

- [ ] **Step 1: Crear directorio y archivo de ilustración**

Crear directorio `src/components/illustrations/` y archivo `LlamaIllustration.tsx` con SVG inline de la llama.

```typescript
interface LlamaProps {
  size?: number
  variant?: 'hero' | 'small' | 'floating'
  animated?: boolean
  className?: string
}
```

Diseño SVG de la llama:
- Cuerpo: elipse marrón tierra (`#c4956a`)
- Cuello largo: rectángulo con bordes redondeados
- Cabeza: óvalo con orejas puntiagudas triangulares
- Ojos: dos círculos pequeños negros con brillo blanco
- Sonrisa: curva suave
- Manta/chullo: rectángulo con franjas horizontales de colores (rojo `#e63946`, naranja `#f4a261`, amarillo `#e9c46a`, verde `#2a9d8f`)
- Patas: 4 rectángulos finos

```tsx
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
  const s = size / 200 // scale factor

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
        <circle cx="82" cy="76" r="4" fill="#1a1a2e" />
        <circle cx="118" cy="76" r="4" fill="#1a1a2e" />
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
```

- [ ] **Step 2: Crear utilitario cn para classnames**

```typescript
// src/lib/utils.ts
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
```

- [ ] **Step 3: Crear archivo index de ilustraciones**

```typescript
// src/components/illustrations/index.ts
export { default as LlamaIllustration } from './LlamaIllustration'
export { default as CandyIllustration } from './CandyIllustration'
```

---

### Task 2: Crear CandyIllustration.tsx (placeholder de producto)

**Files:**
- Create: `src/components/illustrations/CandyIllustration.tsx`

- [ ] **Step 1: Crear SVG placeholder minimalista de gomita**

```typescript
interface CandyIllustrationProps {
  size?: number
  flavor?: string // para variar color
  className?: string
}
```

SVG con forma de osito geométrico (círculos + elipses) con colores pastel.

```tsx
import { cn } from '../../lib/utils'

const candyColors: Record<string, string> = {
  pink: '#ffb3c6',
  yellow: '#ffe066',
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
      <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        {/* Cuerpo */}
        <ellipse cx="50" cy="58" rx="24" ry="28" fill={color} />
        {/* Cabeza */}
        <circle cx="50" cy="38" r="18" fill={color} />
        {/* Orejas */}
        <circle cx="36" cy="24" r="8" fill={color} />
        <circle cx="64" cy="24" r="8" fill={color} />
        {/* Ojos */}
        <circle cx="43" cy="35" r="2.5" fill="#2d1b2e" />
        <circle cx="57" cy="35" r="2.5" fill="#2d1b2e" />
        {/* Sonrisa */}
        <path d="M45 42 Q50 48 55 42" fill="none" stroke="#2d1b2e" strokeWidth="1.5" strokeLinecap="round" />
        {/* Brazos */}
        <ellipse cx="26" cy="54" rx="6" ry="10" fill={color} transform="rotate(-20 26 54)" />
        <ellipse cx="74" cy="54" rx="6" ry="10" fill={color} transform="rotate(20 74 54)" />
        {/* Patas */}
        <ellipse cx="38" cy="82" rx="8" ry="5" fill={color} />
        <ellipse cx="62" cy="82" rx="8" ry="5" fill={color} />
      </svg>
    </div>
  )
}
```

---

### Task 3: Cargar Google Fonts

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Agregar Google Fonts links en `<head>`**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

---

### Task 4: Refactor estilos globales (index.css)

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Actualizar variables CSS y animaciones**

```css
@import "tailwindcss";

:root {
  /* Base */
  --bg: #faf8f5;
  --text: #1a1a2e;
  --text-light: #6b5b6c;
  --gray: #f5f3f5;
  --gray-border: #e8e4e8;

  /* Accent */
  --pink: #ff6b9d;
  --pink-light: #ff8db8;
  --pink-dark: #e55a8a;
  --yellow: #e9c46a;
  --mint: #7dd3c0;

  /* Llama palette */
  --llama-brown: #c4956a;
  --llama-dark: #b8845a;
  --llama-red: #e63946;
  --llama-orange: #f4a261;
  --llama-green: #2a9d8f;

  /* Candy placeholders */
  --candy-pink: #ffb3c6;
  --candy-yellow: #ffe066;
  --candy-green: #a8e6cf;
  --candy-blue: #b3d9ff;
  --candy-purple: #d4b3ff;
  --candy-orange: #ffcc80;
}

/* ── Animations ── */

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); }
  50% { transform: translateY(-14px) rotate(var(--r, 1deg)); }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes gentle-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes ear-wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-8deg); }
  75% { transform: rotate(4deg); }
}

@keyframes pulse-soft {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes scroll-reveal {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── Utility Classes ── */

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out both;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out both;
}

.animate-gentle-float {
  animation: gentle-float 3s ease-in-out infinite;
}

.animate-pulse-soft {
  animation: pulse-soft 3s ease-in-out infinite;
}

.animate-ear-wiggle {
  animation: ear-wiggle 2s ease-in-out infinite;
}

/* ── Scroll reveal (applied via JS) ── */

.scroll-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

.scroll-reveal-delay-1 { transition-delay: 0.1s; }
.scroll-reveal-delay-2 { transition-delay: 0.2s; }
.scroll-reveal-delay-3 { transition-delay: 0.3s; }
.scroll-reveal-delay-4 { transition-delay: 0.4s; }
```

- [ ] **Step 2: Crear hook useScrollReveal**

```typescript
// src/hooks/useScrollReveal.ts
import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
```

---

### Task 5: Refactor Hero con llama integrada

**Files:**
- Modify: `src/components/home/Hero.tsx`

- [ ] **Step 1: Actualizar Hero con layout minimalista + llama central**

```tsx
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import LlamaIllustration from '../illustrations/LlamaIllustration'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#ff6b9d] to-[#ff8db8] px-6 py-16 sm:px-12 sm:py-20 lg:px-20">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-6 top-20 h-12 w-12 rounded-full border-2 border-white/10"
          style={{ animation: 'float 5s ease-in-out 0s infinite', '--r': '0deg' } as React.CSSProperties}
        />
        <div
          className="absolute right-12 top-16 h-6 w-6 rounded-xl border border-white/10 rotate-12"
          style={{ animation: 'float-slow 6s ease-in-out 1s infinite' } as React.CSSProperties}
        />
        <div
          className="absolute left-1/3 bottom-12 h-4 w-4 rounded-full bg-white/10"
          style={{ animation: 'float 4s ease-in-out 0.5s infinite', '--r': '0deg' } as React.CSSProperties}
        />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12">
        {/* Llama */}
        <div className="animate-gentle-float shrink-0">
          <LlamaIllustration size={220} variant="floating" animated />
        </div>

        {/* Text */}
        <div className="text-center lg:text-left">
          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Armá tu mix perfecto
            <br />
            <span className="text-[#ffe066]">y recibilo en casa</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/85 sm:text-lg lg:mx-0">
            Las gomitas más frescas y sabrosas las armás vos. Elegí, combiná y recibí tu pedido donde quieras.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#ff6b9d] shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Ver Catálogo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              Mayoristas
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

### Task 6: Refactor FeaturedProducts con CandyIllustration + stagger + scroll reveal

**Files:**
- Modify: `src/components/home/FeaturedProducts.tsx`

- [ ] **Step 1: Reemplazar gradient placeholder por CandyIllustration y agregar stagger + scroll reveal**

```tsx
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import LlamaIllustration from '../illustrations/LlamaIllustration'
import CandyIllustration from '../illustrations/CandyIllustration'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { Product } from '../../types'

interface Props { products: Product[] }

const badges = ['Mas Vendido', 'Nuevo!', 'Mas Vendido', 'Nuevo!']
const flavors = ['pink', 'yellow', 'green', 'blue']

export default function FeaturedProducts({ products }: Props) {
  const { addItem } = useCart()
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#faf8f5] px-6 py-16 sm:px-12 lg:px-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-6 top-16 h-8 w-8 rounded-full border-2 border-[#ff6b9d]/10" style={{ animation: 'float-slow 6s ease-in-out 0s infinite' }} />
        <div className="absolute left-12 bottom-12 h-5 w-5 rounded-xl bg-[#ffe066]/15 -rotate-12" style={{ animation: 'float-slow 5s ease-in-out 1.5s infinite' }} />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <div className="mb-2 inline-flex items-center gap-2">
            <LlamaIllustration size={36} variant="small" animated={false} />
            <h2 className="font-serif text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
              Los Mas Tentadores
            </h2>
          </div>
          <p className="text-base text-[#6b5b6c]">Nuestros favoritos</p>
        </div>
        {products.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, i) => {
              const badge = badges[i % badges.length]
              const flavor = flavors[i % flavors.length]
              return (
                <div
                  key={product.id}
                  className="group rounded-2xl bg-white shadow-sm transition-all hover:shadow-md scroll-reveal scroll-reveal-delay-1"
                  style={{ animationDelay: `${0.1 * (i + 1)}s` }}
                >
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <Link to={`/producto/${product.slug}`}>
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      ) : (
                        <div className="flex h-52 items-center justify-center bg-[#f5f3f5] transition-colors duration-300 group-hover:bg-[#f0ecef]">
                          <CandyIllustration size={100} flavor={flavor} />
                        </div>
                      )}
                    </Link>
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#ff6b9d] shadow-sm backdrop-blur-sm">
                      {badge}
                    </span>
                  </div>
                  <div className="p-4">
                    <Link to={`/producto/${product.slug}`}>
                      <h3 className="text-sm font-semibold text-[#1a1a2e] transition-colors group-hover:text-[#ff6b9d]">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="mt-1 text-lg font-bold text-[#ff6b9d]">
                      ${product.price.toLocaleString('es-AR')}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        const w = product.weight_options?.[0] ?? { label: '100g', grams: 100, price: product.price }
                        addItem(product as any, w, 1)
                      }}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff6b9d] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#e55a8a] active:scale-95"
                    >
                      <Plus className="h-4 w-4" />
                      Agregar +
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="mt-10 flex items-center justify-center py-12 text-gray-400">
            <p className="text-base font-medium">Cargando productos destacados...</p>
          </div>
        )}
      </div>
    </section>
  )
}
```

---

### Task 7: Refactor ProductCard con CandyIllustration

**Files:**
- Modify: `src/components/product/ProductCard.tsx`

- [ ] **Step 1: Reemplazar gradient placeholder por CandyIllustration**

```tsx
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import CandyIllustration from '../illustrations/CandyIllustration'

interface ProductCardProps {
  product: {
    id: string; name: string; slug: string; price: number
    image_url: string | null; weight_options: any[] | null; is_featured: boolean
    category?: { name: string } | null
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const defaultWeight = product.weight_options?.[0] ?? { label: '100g', grams: 100, price: product.price }

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation()
    addItem(product as any, defaultWeight)
  }

  return (
    <Link
      to={`/producto/${product.slug}`}
      className="block rounded-2xl bg-white shadow-sm transition-all hover:shadow-md group"
    >
      <div className="aspect-square overflow-hidden rounded-t-2xl">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name}
               className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#f5f3f5] transition-colors group-hover:bg-[#f0ecef]">
            <CandyIllustration size={80} />
          </div>
        )}
      </div>
      <div className="p-4">
        {product.category && (
          <span className="mb-1.5 inline-block rounded-full bg-pink-50 px-2 py-0.5 text-xs font-medium text-pink-500">
            {product.category.name}
          </span>
        )}
        <h3 className="mb-1 text-sm font-semibold leading-tight text-[#1a1a2e] line-clamp-2">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-[#ff6b9d]">
          ${defaultWeight.price.toFixed(2)}
        </p>
        <button
          onClick={handleAdd}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#ff6b9d] py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Agregar +
        </button>
      </div>
    </Link>
  )
}
```

---

### Task 8: Refactor CategoriesGrid con SVG ilustrativos por categoría

**Files:**
- Modify: `src/components/home/CategoriesGrid.tsx`

- [ ] **Step 1: Reemplazar Lucide icons por SVG ilustrativos inline**

El componente actual mapea slugs a Lucide icons. Crear SVG minimalistas inline para cada categoría:

- `/gomitas`: SVG de osito (reutilizar forma de CandyIllustration)
- `/combos`: SVG de tres círculos agrupados
- `/eventos`: SVG de estrella/confetti
- default: SVG genérico de caramelo

```tsx
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { Category } from '../../types'

interface Props { categories: Category[] }

function CategoryIcon({ slug, size = 40 }: { slug: string; size?: number }) {
  const s = size
  const icons: Record<string, JSX.Element> = {
    gomitas: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <circle cx="20" cy="16" r="8" fill="#ffb3c6" />
        <ellipse cx="20" cy="26" rx="10" ry="12" fill="#ffb3c6" />
        <circle cx="17" cy="15" r="1.5" fill="#1a1a2e" />
        <circle cx="23" cy="15" r="1.5" fill="#1a1a2e" />
        <path d="M18 19 Q20 22 22 19" fill="none" stroke="#1a1a2e" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    combos: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <circle cx="14" cy="20" r="10" fill="#a8e6cf" />
        <circle cx="26" cy="16" r="8" fill="#ffb3c6" />
        <circle cx="28" cy="28" r="7" fill="#ffe066" />
      </svg>
    ),
    eventos: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <polygon points="20,4 24,14 35,14 26,20 29,32 20,25 11,32 14,20 5,14 16,14" fill="#ffe066" />
        <circle cx="14" cy="8" r="3" fill="#ffb3c6" />
        <circle cx="30" cy="32" r="3" fill="#a8e6cf" />
      </svg>
    ),
  }
  return icons[slug] ?? (
    <svg viewBox="0 0 40 40" width={s} height={s}>
      <rect x="8" y="10" width="24" height="20" rx="6" fill="#ffb3c6" />
      <rect x="14" y="6" width="12" height="8" rx="4" fill="#ff8db8" />
    </svg>
  )
}

export default function CategoriesGrid({ categories }: Props) {
  const sectionRef = useScrollReveal()

  const bgMap: Record<string, string> = {
    gomitas: 'bg-[#fff0f3] hover:bg-[#ffe0e6]',
    combos: 'bg-[#f0faf4] hover:bg-[#d8f5e3]',
    eventos: 'bg-[#fffbe6] hover:bg-[#fff3c4]',
  }

  return (
    <section ref={sectionRef} className="relative bg-[#faf8f5] px-6 py-16 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-[#1a1a2e] sm:text-4xl">Categorias</h2>
          <p className="mt-1 text-base text-[#6b5b6c]">Elegi por tipo</p>
        </div>
        {categories.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/${cat.slug}`}
                className={`group flex flex-col items-center gap-3 rounded-2xl p-6 transition-all duration-300 ${bgMap[cat.slug] ?? 'bg-[#f5f3f5] hover:bg-[#ebe7eb]'}`}
              >
                <CategoryIcon slug={cat.slug} size={44} />
                <span className="text-sm font-semibold text-[#1a1a2e]">{cat.name}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-center text-gray-400">Cargando categorias...</p>
        )}
      </div>
    </section>
  )
}
```

---

### Task 9: Refactor App.tsx tipografía (body font)

**Files:**
- Modify: `src/index.css` (actualizar body)

- [ ] **Step 1: Agregar clase de tipografía al body en App.tsx**

En `src/index.css`, agregar regla base:

```css
body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg);
  color: var(--text);
}

.font-serif {
  font-family: 'DM Serif Display', serif;
}
```

---

### Task 10: Refactor Cart placeholder

**Files:**
- Modify: `src/pages/Cart.tsx`

- [ ] **Step 1: Reemplazar gradient placeholder por CandyIllustration**

Buscar el div con `bg-gradient-to-br from-pink-200 to-yellow-200` en Cart.tsx y reemplazar:

```tsx
// Antes:
<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-200 to-yellow-200">
  <span className="text-xl font-bold text-white/50">{item.product.name.charAt(0)}</span>
</div>

// Despues:
<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#f5f3f5]">
  {item.product.image_url ? (
    <img src={item.product.image_url} alt={item.product.name} className="h-full w-full rounded-xl object-cover" />
  ) : (
    <CandyIllustration size={48} />
  )}
</div>
```

---

### Task 11: Refactor ProductDetail placeholder

**Files:**
- Modify: `src/pages/ProductDetail.tsx`

- [ ] **Step 1: Reemplazar gradient placeholder por CandyIllustration**

```tsx
// Antes:
<div className="flex h-96 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-200 to-yellow-200 shadow-sm">
  {product.image_url ? (
    <img src={product.image_url} ... />
  ) : (
    <span className="text-7xl font-black text-white/40">{product.name.charAt(0)}</span>
  )}
</div>

// Despues:
<div className="flex h-96 items-center justify-center rounded-2xl bg-[#f5f3f5] shadow-sm">
  {product.image_url ? (
    <img src={product.image_url} alt={product.name} className="h-full w-full rounded-2xl object-cover" />
  ) : (
    <CandyIllustration size={160} />
  )}
</div>
```

---

### Task 12: Agregar scroll reveal a páginas de la tienda

**Files:**
- Modify: `src/pages/Catalog.tsx`
- Modify: `src/pages/Login.tsx`
- Modify: `src/pages/Register.tsx`
- Modify: `src/pages/Checkout.tsx`

- [ ] **Step 1: Envolver secciones principales con scroll-reveal**

En cada página, agregar `useScrollReveal` al contenedor principal y la clase `scroll-reveal` a las secciones.

Ejemplo para Catalog.tsx:
```tsx
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Catalog() {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className="scroll-reveal">
      {/* contenido existente */}
    </div>
  )
}
```

---

### Task 13: Verificar build

- [ ] **Step 1: Ejecutar build y verificar que no haya errores**

Run: `npm run build`
Expected: Build exits with code 0, no TypeScript errors.

- [ ] **Step 2: Ejecutar tests de Playwright**

Run: `python test_webapp.py`
Expected: All 25 tests pass.
