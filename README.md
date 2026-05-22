# Atmosférico A.M. LAN — Sitio Web Corporativo

**Cliente:** Atmosférico A.M. LAN  
**Proyecto:** Opción C — Google Maps + Web con dominio propio  
**Desarrollado por:** Pamela Olave / Creadoras3D  
**Fecha:** Mayo 2026

---

## Stack técnico

- HTML5 semántico
- CSS3 (mobile-first, sin frameworks)
- JavaScript vanilla (~2KB)
- Sin dependencias externas de JS
- Fuentes: Inter via Google Fonts

## Estructura de archivos

```
/
├── index.html
├── css/
│   ├── critical.css      ← inline en <head>
│   └── main.css
├── js/
│   └── main.js
├── img/
│   ├── hero-mobile.webp
│   ├── hero-desktop.webp
│   └── og-image.jpg
└── favicon.ico
```

---

## Especificación técnica

### Paleta de colores

| Variable | Valor | Uso |
|---|---|---|
| `--color-primary` | `#001F3F` | Azul oscuro principal |
| `--color-primary-alt` | `#0A2E5C` | Azul hover/variante |
| `--color-accent` | `#E6B800` | Amarillo mostaza |
| `--color-accent-alt` | `#FFB300` | Amarillo hover |
| `--color-white` | `#FFFFFF` | Blanco |
| `--color-gray-light` | `#F4F5F7` | Fondos alternos |
| `--color-gray-mid` | `#6B7280` | Texto secundario |
| `--color-gray-dark` | `#1F2937` | Texto medio |
| `--color-text` | `#111827` | Texto principal |
| `--color-overlay` | `rgba(0,31,63,0.72)` | Overlay hero |

### Tipografía — Inter (Google Fonts)

| Rol | Mobile | Desktop |
|---|---|---|
| H1 hero | 28px / 800 / lh 1.2 | 52px / 800 / lh 1.15 |
| H2 sección | 22px / 700 / lh 1.3 | 36px / 700 / lh 1.25 |
| H3 card | 16px / 600 / lh 1.4 | 20px / 600 |
| Body | 15px / 400 / lh 1.6 | 16px / 400 |
| Label/chip | 13px / 500 | 14px / 500 |
| CTA button | 16px / 700 | 18px / 700 |

### Breakpoints

| Nombre | Valor |
|---|---|
| Mobile base | 375px |
| Mobile large | 428px |
| Tablet | 768px |
| Desktop small | 1024px |
| Desktop | 1280px |

### Spacing system (base 4px)

```
--space-xs:  4px
--space-sm:  8px
--space-md:  16px
--space-lg:  24px
--space-xl:  40px
--space-2xl: 64px
--space-3xl: 96px
```

---

## Secciones (One Page)

### 1. Header
- Sticky, `z-index: 100`, altura 56px mobile / 72px desktop
- Background `#001F3F`
- Logo izquierda, hamburguesa derecha (mobile) / nav inline (desktop)
- Drawer mobile: full width, slide down 250ms

### 2. Hero
- `min-height: 620px` / `100svh`
- Foto camión fondo full-width (portrait mobile, landscape desktop)
- Overlay `rgba(0,31,63,0.72)`
- Badge "Cámara disponible hoy" en `#E6B800`
- H1: "Destapes y Desagotes en Mar del Plata"
- Subtítulo: "Respuesta rápida • Llegamos a tu zona • Servicio profesional"
- Botón 1: "Llamar Ahora" (`href="tel:"`) — fondo `#E6B800`
- Botón 2: "Escribir por WhatsApp" — borde blanco
- Botones: stack mobile, row desde 768px

### 3. Servicios
- Background `#F4F5F7`
- Grid: 1 col mobile → 2 col tablet → 4 col desktop
- Cards: Pozos Ciegos | Destapes de Cloacas | Cámaras Sépticas | Efluentes
- Ícono SVG inline, contenedor `52×52px`, bg `rgba(230,184,0,0.12)`

### 4. Zonas de Cobertura
- Background `#FFFFFF`
- Chips con ícono pin: Mar del Plata Centro, Zona Sur, Alfar, Los Acantilados, Barrios aledaños
- **NO mencionar Sierra de los Padres**
- Desktop: layout 2 col con mapa estático derecha

### 5. Diferenciales
- Background `#001F3F` (sección oscura)
- Grid: 1 col → 2 col → 4 col
- Cards: Respuesta rápida | Coordinamos en el momento | Equipo propio | Servicio confiable
- **NO usar "24 horas", "urgencia 24hs" ni similares**

### 6. Testimonios
- Background `#F4F5F7`
- Carousel CSS Scroll Snap (sin JS)
- 1 card visible mobile → 2 tablet → 3 desktop
- 5 estrellas `#E6B800`, autor con inicial en círculo

### 7. CTA Final
- Background `linear-gradient(135deg, #E6B800, #FFB300)`
- "¿Necesitás un camión atmosférico?"
- Botón "Llamar" fondo `#001F3F` + Botón "WhatsApp" fondo blanco

### 8. Footer
- Background `#0A1628`
- 3 columnas desktop: identidad | contacto | navegación
- Stack vertical mobile

### 9. FAB WhatsApp
- `position: fixed; bottom: 24px; right: 20px`
- Fondo `#25D366`, pulso animado
- Siempre visible

---

## SEO

- Title: "Camión Atmosférico en Mar del Plata | Desagotes y Destapes | A.M. LAN"
- Meta description con palabras clave locales
- Schema.org `LocalBusiness`
- Open Graph completo
- `lang="es-AR"`

## Performance objetivo

| Métrica | Objetivo |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID | < 100ms |
| Peso total | < 200KB (sin imágenes) |

- Imágenes: WebP + fallback JPG, `loading="lazy"` (excepto hero)
- Hero: `fetchpriority="high"` + `srcset` 375w / 768w / 1200w
- CSS crítico inline, resto con preload
- JS mínimo: IntersectionObserver + menú hamburguesa (~2KB)

---

## Restricciones de contenido

- **NO** mencionar "24 horas", "atención 24hs", "urgencia 24hs"
- **NO** mencionar Sierra de los Padres
- **SÍ** usar: "respuesta rápida", "llegamos rápido", "coordinamos en el momento"

---

## Pendiente del cliente

- [ ] Foto(s) del camión (formato WebP preferido, mínimo 1200px ancho)
- [ ] Logo (SVG o PNG alta resolución)
- [ ] Número de teléfono definitivo
- [ ] Número de WhatsApp definitivo
- [ ] Reseñas reales de Google para testimonios
- [ ] Compra de dominio en NIC Argentina (.com.ar)

---

## Pagos

- 50% al inicio del proyecto
- 50% al finalizar
- Al pagar el 100%: sitio y ficha Google Maps son propiedad del cliente
