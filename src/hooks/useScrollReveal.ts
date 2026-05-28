import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

export function useStaggeredReveal(count: number) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const children = Array.from(container.children) as HTMLElement[]
    const elementsToObserve = children.slice(0, count)

    if (elementsToObserve.length === 0) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          elementsToObserve.forEach((child, i) => {
            child.classList.add('visible')
            child.style.transitionDelay = `${i * 0.08}s`
          })
          observer.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )

    // Observe the first child
    observer.observe(elementsToObserve[0])
    return () => observer.disconnect()
  }, [count])

  return containerRef
}
