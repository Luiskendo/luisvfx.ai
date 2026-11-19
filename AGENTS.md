# AGENTS.md — luisvfx.ai (sitio personal de Luis, editor de video con IA)

Guía de contexto para agentes IA. Leer antes de tocar código.

## Qué es
Landing page personal (Vite + React 19 + TypeScript) que replica un prototipo HTML
aprobado por el cliente. Destino: GitHub Pages (project page).

## Reglas duras (no negociables)
- **NO modificar, mover ni borrar nada en `../Recursos/`** — es el backup original
  del cliente. Solo se puede COPIAR desde ahí.
- **NO cambiar textos ni orden de secciones** — el flujo de ventas está aprobado
  (Hero → Quién soy → Tecnologías → Proceso → Portafolio → Paquetes → Contacto).
- **NO reintroducir** el texto "Edito videos con IA para tu curso o academia."
  (el cliente pidió quitarlo) ni el número de WhatsApp placeholder `573001234567`.
- Número real de WhatsApp: `573123867687` (Header y Contact).
- Desviaciones aprobadas por el cliente del prototipo original:
  1. Sin subtítulo de scroll bajo el título.
  2. Título termina más grande: 8vw en escritorio / 12vw en móvil.
  3. `.hero-section` de 150vh en vez de 200vh (menos hueco antes de Quién soy).
  4. En móvil el menú muestra números 1-5 en vez de desaparecer.
  5. Glow blanco sutil en el logo del header.
  6. Fuente Noto Sans fija (ver abajo) en vez de system-ui.
- El cliente prefiere que se le **pregunte** antes de asumir decisiones visuales.

## Paleta (vars de `src/index.css`)
`--bg #000000` (negro puro) · `--text #F5F5F5` · `--accent #E8B14C` (amarillo) ·
`--muted #888888` · `--wa-green #25D366` · `--progress` (scroll del Hero, 0→1).

## Tipografía
- **Noto Sans variable** (un solo archivo, pesos 100-900): `public/fonts/NotoSans-Variable.woff2`.
- El `@font-face` usa ruta **absoluta** `/luisvfx.ai/fonts/...` a propósito: en dev el CSS
  viaja como `<style>` y una ruta relativa resolvería contra la URL de la página (404).
  No "simplificar" a `../fonts/`.
- Doble `src` (`woff2-variations` + `woff2`) por navegadores móviles viejos.
- El Windows del cliente ya trae Noto Sans instalada — en su PC todo se ve igual
  con o sin la fuente; probar cambios de fuente en el celular.

## Arquitectura
```
src/
  App.tsx        — orden de secciones + Lenis global (autoRaf, cleanup) + Cursor
  index.css      — vars de paleta, @font-face, body, reglas Lenis
  main.tsx       — montaje
  components/    — cada componente con su .css al lado (estilos verbatim del prototipo)
    Cursor/      — cursor custom (solo pointer:fine; montado primero)
    Header.tsx   — aparece a scrollY > 50vh; resalta sección activa (main section[id]);
                   móvil: números 1-5 (.nav-num), escritorio: texto (.nav-label)
    Hero.tsx     — título sticky que encoge y sube con el scroll:
                   `--progress` via useScroll + useSpring + useMotionValueEvent
    About/ Process/ Portfolio/ Pricing/ Contact/ TechStrip/ Footer/
    PrivacyPage/ — Aviso de Privacidad (página aparte, ver "Multi-página")
public/          — logo.jpg, logo.ico + logos tech (rutas via import.meta.env.BASE_URL)
```
- **Multi-página (Vite)**: `index.html` (landing) + `privacidad.html` (aviso de
  privacidad), declarados en `vite.config.ts` → `rollupOptions.input`. La página de
  privacidad vive en `src/privacidad/main.tsx` y usa el mismo `index.css` (paleta +
  fuente). Enlaces entre páginas: `${import.meta.env.BASE_URL}privacidad.html` y
  `${import.meta.env.BASE_URL}` (volver). URL final:
  `https://luiskendo.github.io/luisvfx.ai/privacidad.html`.
  El aviso declara que NO se recopilan datos (sin cookies/analítica), terceros
  (WhatsApp, Instagram, TikTok, GitHub Pages), derechos ARCO (Ley 1581/2012) y cambios.
- Anclas de navegación: `#about`, `#process`, `#portfolio`, `#paquetes`, `#contact`
  (Hero y TechStrip sin link en el menú, igual que el prototipo).
- Móvil (<768px): título Hero `calc(21.5vw - 9.5vw*progress)`, indicador
  "Desliza hacia abajo" a 112px del borde, logo 38px con glow.

## Comandos
- `npm run dev` → **la URL incluye el base**: `http://localhost:5173/luisvfx.ai/`
  (con `-- --host` para probar desde el celular por WiFi).
- `npm run build` → tsc + vite build; verificar que pase limpio.
- `npm run preview` → sirve `dist/` con el base.

## Deploy (EN VIVO — hecho 2026-11-13)
- Repo: https://github.com/Luiskendo/luisvfx.ai (público, se subió con PAT del
  usuario — para push de cambios al workflow se requiere permiso "Workflows:
  Read and write" en el token).
- `vite.config.ts` tiene `base: '/luisvfx.ai/'` → URL en producción:
  **https://luiskendo.github.io/luisvfx.ai/** (y `/privacidad.html`).
- Deploy automático: `.github/workflows/deploy.yml` corre con cada push a `main`.
  Requiere una vez: Settings → Pages → Source: "GitHub Actions" (ya configurado).
- La carpeta ES un repo git (rama `main`; remoto `origin` = el repo de GitHub).
- Flujo para publicar cambios: editar → `git add -A && git commit -m "..." && git push`.
- Verificado en producción (200 OK): home, privacidad, fuente, logo.
- Al probar cambios en el celular: cerrar la pestaña y reabrir (caché agresiva);
  confirmar que se ven los números 1-4 del menú = CSS nuevo cargado.

## Marketing / link
- El link del sitio se comparte tal cual (`luiskendo.github.io/luisvfx.ai`) —
  **NO usar acortadores**: se ven menos profesionales, generan desconfianza y
  pueden morir rompiendo todos los perfiles donde esté pegado.
- Upgrade futuro opcional: comprar el dominio `luisvfx.ai` (~$12 USD/año) y
  conectarlo en Settings → Pages (campo "Custom domain").
