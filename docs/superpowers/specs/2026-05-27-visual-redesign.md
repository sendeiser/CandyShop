# Rediseño Visual: Candy Shop — Estilo Minimalista + Ilustrativo con Mascota Llama Peruana

## Resumen
Refactor visual completo de Candy Shop hacia un estilo minimalista-ilustrativo con una llama peruana como mascota principal. Sin fotos reales — todo el carácter visual viene de ilustraciones SVG, tipografía cuidada, y animaciones sutiles.

## Dirección estética
- **Minimalista**: mucho espacio blanco, bordes sutiles, alineación limpia
- **Ilustrativo**: SVG inline como alma visual, no fotos
- **Identidad peruana**: llama como mascota, patrones andinos, calidez de colores tierra
- **Tono**: Alegre pero refinado, infantil sin ser infantil

## Componentes a crear/modificar

### 1. `src/components/illustrations/LlamaIllustration.tsx`
- SVG inline de la llama peruana como mascota
- Props: `size`, `variant` ('hero' | 'small' | 'floating'), `animated`
- Animaciones CSS: orejas que se mueven (ear-wiggle), flotación suave
- Colores: cuerpo marrón tierra (#c4956a), manta colorida con franjas rojas/naranjas/amarillas/verdes

### 2. `src/components/illustrations/CandyIllustration.tsx`
- SVG inline genérico para placeholder de productos sin foto
- Props: `type` (categoría), `size`
- Gomitas geométricas minimalistas en vez de gradientes genéricos
- Colores: tonos pastel combinables

### 3. Refactor de Hero
- Integrar `LlamaIllustration` como elemento central (no decorativo)
- Ajustar layout: llama a la izquierda, texto a la derecha (desktop), centrado (mobile)
- Simplificar elementos flotantes decorativos (menos, más intencionales)

### 4. Refactor de FeaturedProducts
- Usar `CandyIllustration` como placeholder cuando no hay `image_url`
- Animación stagger en aparición de tarjetas
- Hover: la ilustración SVG cambia de color/sorrisa

### 5. Refactor de ProductCard
- Placeholder con `CandyIllustration` en vez de gradiente genérico
- Animación de entrada en vista de catálogo

### 6. CategoriesGrid
- Ilustraciones SVG por categoría en vez de Lucide icons

### 7. Estilos globales (`src/index.css`)
- Variables CSS refinadas (paleta tierra + acentos)
- Animaciones scroll-triggered con IntersectionObserver utility
- Animaciones de oreja/movimiento para la llama

### 8. Tipografía
- `DM Serif Display` para títulos (Google Fonts)
- `Inter` o `Outfit` para cuerpo
- Cargar via `<link>` en `index.html` o `@import` en CSS

## Paleta de colores
- Fondo: `#faf8f5` (blanco roto)
- Texto primario: `#1a1a2e` (gris oscuro)
- Texto secundario: `#6b5b6c` (mantener)
- Acento principal: `#ff6b9d` (mantener, menos saturado visualmente)
- Marrón llama: `#c4956a`
- Manta rojo: `#e63946`
- Manta naranja: `#f4a261`
- Manta amarillo: `#e9c46a`
- Manta verde: `#2a9d8f`

## Animaciones
- `ear-wiggle`: orejas de llama (translateX leve, alternante)
- `gentle-float`: flotación más suave que la actual
- `scroll-fade-in`: reveal con IntersectionObserver
- `stagger-card`: entrada escalonada de tarjetas
- `svg-morph`: cambios sutiles en SVG al hacer hover

## Implementación
1. Crear `LlamaIllustration.tsx` (SVG + animaciones)
2. Crear `CandyIllustration.tsx`
3. Cargar Google Fonts en `index.html`
4. Refactor `src/index.css` (variables, animaciones nuevas)
5. Refactor Hero con llama
6. Refactor FeaturedProducts con CandyIllustration + stagger
7. Refactor ProductCard con CandyIllustration
8. Refactor CategoriesGrid con SVG por categoría
