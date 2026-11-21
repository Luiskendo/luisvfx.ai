#!/usr/bin/env node
// scripts/guiones.mjs — gestor interactivo de clientes y guiones (luisvfx.ai)
import readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const CLIENTS_DIR = path.join(ROOT, 'src', 'data', 'clientes')
const GUIONES_DIR = path.join(ROOT, 'guiones')
const SRC_GUIONES_DIR = path.join(ROOT, 'src', 'guiones')
const VITE_CONFIG = path.join(ROOT, 'vite.config.ts')

const rl = readline.createInterface({ input, output, terminal: Boolean(output.isTTY) })

const lineBuffer = []
const resolvers = []
rl.on('line', (line) => {
  if (resolvers.length) {
    const resolve = resolvers.shift()
    resolve(line)
  } else {
    lineBuffer.push(line)
  }
})
rl.on('close', () => {
  while (resolvers.length) resolvers.shift()('')
})

function ask(q, def = '') {
  const suffix = def ? ` [${def}]` : ''
  process.stdout.write(`${q}${suffix}: `)
  return new Promise((resolve) => {
    const handle = (line) => {
      const val = line.trim() === '' ? def : line.trim()
      resolve(val)
    }
    if (lineBuffer.length) {
      handle(lineBuffer.shift())
    } else {
      resolvers.push(handle)
    }
  })
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

function ensureDirs() {
  fs.mkdirSync(CLIENTS_DIR, { recursive: true })
}

function listClients() {
  if (!fs.existsSync(CLIENTS_DIR)) return []
  return fs
    .readdirSync(CLIENTS_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const slug = f.replace(/\.json$/, '')
      let name = slug
      let count = 0
      try {
        const data = JSON.parse(fs.readFileSync(path.join(CLIENTS_DIR, f), 'utf8'))
        name = data.clientName || slug
        count = Array.isArray(data.guiones) ? data.guiones.length : 0
      } catch {}
      return { slug, name, count }
    })
}

function updateViteConfig(slug) {
  if (!fs.existsSync(VITE_CONFIG)) return
  let content = fs.readFileSync(VITE_CONFIG, 'utf8')
  if (content.includes(`${slug}: 'guiones/`)) return
  const needle = "        privacidad: 'privacidad.html',\n"
  if (!content.includes(needle)) return
  content = content.replace(needle, `${needle}        ${slug}: 'guiones/${slug}/index.html',\n`)
  fs.writeFileSync(VITE_CONFIG, content)
}

function htmlTemplate(slug, clientName) {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/luisvfx.ai/logo.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Panel de guiones — ${clientName} | luisvfx.ai</title>
    <link rel="preload" href="/luisvfx.ai/fonts/NotoSans-Variable.woff2" as="font" type="font/woff2" crossorigin />
    <meta name="robots" content="noindex, nofollow, noarchive" />
    <meta name="googlebot" content="noindex, nofollow" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/guiones/${slug}/main.tsx"></script>
  </body>
</html>
`
}

function mainTemplate(slug) {
  return `import { createRoot } from 'react-dom/client'
import '../../index.css'
import ClienteGuiones from '../../components/ClienteGuiones'
import cliente from '../../data/clientes/${slug}.json'

createRoot(document.getElementById('root')!).render(<ClienteGuiones {...cliente} />)
`
}

async function newClient() {
  console.log('\n┌──────────────────────────────┐')
  console.log('│  NUEVO CLIENTE               │')
  console.log('└──────────────────────────────┘')
  const name = await ask('Nombre del cliente')
  if (!name) {
    console.log('Cancelado.')
    return
  }
  let slug = slugify(name)
  const slugInput = await ask('Slug (identificador URL)', slug)
  if (slugInput) slug = slugify(slugInput)
  if (!slug) {
    console.log('Slug inválido.')
    return
  }

  const jsonPath = path.join(CLIENTS_DIR, `${slug}.json`)
  if (fs.existsSync(jsonPath)) {
    console.log(`\n⚠️  El cliente "${slug}" ya existe.`)
    return
  }

  const logoDefault = `${slug}.jpeg`
  const logoFile = (await ask('Archivo del logo en /public', logoDefault)) || logoDefault
  const logoSrc = `/luisvfx.ai/${logoFile}`

  fs.mkdirSync(path.join(GUIONES_DIR, slug), { recursive: true })
  fs.mkdirSync(path.join(SRC_GUIONES_DIR, slug), { recursive: true })

  fs.writeFileSync(path.join(GUIONES_DIR, slug, 'index.html'), htmlTemplate(slug, name))
  fs.writeFileSync(path.join(SRC_GUIONES_DIR, slug, 'main.tsx'), mainTemplate(slug))
  const data = { clientName: name, logoSrc, guiones: [] }
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n')
  updateViteConfig(slug)

  console.log(`\n✅ Cliente "${name}" creado (slug: ${slug}).`)
  console.log(`   URL: /guiones/${slug}/`)

  const add = await ask('¿Agregar un guion ahora? (s/n)', 's')
  if (add.toLowerCase().startsWith('s')) {
    await addGuion(slug)
  }
}

async function editScenes(escenas) {
  while (true) {
    console.log('\nEscenas actuales:')
    if (escenas.length === 0) console.log('  (ninguna)')
    escenas.forEach((e, i) => console.log(`  ${i + 1}) ${e.label}`))
    console.log('\n  1) Guardar y continuar')
    console.log('  2) Agregar escena')
    console.log('  3) Eliminar escena')
    console.log('  4) Mover escena')
    console.log('  5) Editar escena')
    const opt = await ask('Opción')
    if (opt === '1') break
    if (opt === '2') {
      const locucion = await ask('  Locución')
      const visual = await ask('  Visual')
      const label = (await ask('  Etiqueta', `Escena ${escenas.length + 1}`)) || `Escena ${escenas.length + 1}`
      escenas.push({ label, locucion, visual })
    } else if (opt === '3') {
      const n = parseInt(await ask('  Número a eliminar'), 10)
      if (!isNaN(n) && n >= 1 && n <= escenas.length) {
        escenas.splice(n - 1, 1)
        console.log('  Eliminada.')
      } else {
        console.log('  Número inválido.')
      }
    } else if (opt === '4') {
      const from = parseInt(await ask('  Mover desde (número)'), 10)
      const to = parseInt(await ask('  Hacia (número)'), 10)
      if (isNaN(from) || isNaN(to) || from < 1 || from > escenas.length || to < 1 || to > escenas.length) {
        console.log('  Números inválidos.')
      } else {
        const [item] = escenas.splice(from - 1, 1)
        escenas.splice(to - 1, 0, item)
        console.log('  Movida.')
      }
    } else if (opt === '5') {
      const n = parseInt(await ask('  Número a editar'), 10)
      if (isNaN(n) || n < 1 || n > escenas.length) {
        console.log('  Número inválido.')
      } else {
        const e = escenas[n - 1]
        e.label = (await ask('  Etiqueta', e.label)) || e.label
        e.locucion = (await ask('  Locución', e.locucion)) || e.locucion
        e.visual = (await ask('  Visual', e.visual)) || e.visual
        console.log('  Actualizada.')
      }
    } else {
      console.log('  Opción inválida.')
    }
  }
}

async function addGuion(slug) {
  const jsonPath = path.join(CLIENTS_DIR, `${slug}.json`)
  if (!fs.existsSync(jsonPath)) {
    console.log('Cliente no encontrado.')
    return
  }
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))

  console.log(`\n┌──────────────────────────────┐`)
  console.log(`│  NUEVO GUION — ${data.clientName}`.padEnd(33, ' ') + '│')
  console.log('└──────────────────────────────┘')

  const title = await ask('Título del guion')
  if (!title) {
    console.log('Cancelado.')
    return
  }
  const duracion = await ask('Duración (ej. ~16 s)', '~16 s')
  const formato = await ask('Formato (ej. Vertical 9:16)', 'Vertical 9:16 (Instagram / TikTok)')
  const cierre = await ask('Cierre / CTA', title)

  const nStr = await ask('Cantidad de escenas', '3')
  const n = Math.max(0, parseInt(nStr, 10) || 0)
  const escenas = []
  for (let i = 0; i < n; i++) {
    console.log(`\n--- Escena ${i + 1} ---`)
    const locucion = await ask('Locución')
    const visual = await ask('Visual')
    const label = (await ask('Etiqueta', `Escena ${i + 1}`)) || `Escena ${i + 1}`
    escenas.push({ label, locucion, visual })
  }

  await editScenes(escenas)

  let id = slugify(title) || `guion_${Date.now()}`
  let finalId = id
  let counter = 2
  while (data.guiones.some((g) => g.id === finalId)) {
    finalId = `${id}_${counter++}`
  }

  data.guiones.push({ id: finalId, title, duracion, formato, escenas, cierre })
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n')

  console.log(`\n✅ Guion "${title}" agregado a ${data.clientName}.`)
  console.log(`   ID: ${finalId}`)
}

async function chooseClient() {
  const clients = listClients()
  if (clients.length === 0) {
    console.log('\nNo hay clientes. Crea uno primero.')
    return null
  }
  console.log('\nClientes disponibles:')
  clients.forEach((c, i) => console.log(`  ${i + 1}) ${c.name}  (${c.slug}) — ${c.count} guion(es)`))
  const n = parseInt(await ask('Selecciona un cliente (número)'), 10)
  if (isNaN(n) || n < 1 || n > clients.length) {
    console.log('Selección inválida.')
    return null
  }
  return clients[n - 1].slug
}

async function showClients() {
  const clients = listClients()
  console.log('\n┌──────────────────────────────┐')
  console.log('│  CLIENTES EXISTENTES         │')
  console.log('└──────────────────────────────┘')
  if (clients.length === 0) {
    console.log('  (ninguno)')
    return
  }
  clients.forEach((c, i) => {
    console.log(`  ${i + 1}) ${c.name}`)
    console.log(`     slug: ${c.slug}`)
    console.log(`     guiones: ${c.count}`)
    console.log(`     URL: /guiones/${c.slug}/`)
  })
}


async function deleteGuion() {
  const slug = await chooseClient()
  if (!slug) return
  const jsonPath = path.join(CLIENTS_DIR, `${slug}.json`)
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
  if (!Array.isArray(data.guiones) || data.guiones.length === 0) {
    console.log('\nEste cliente no tiene guiones.')
    return
  }
  console.log('\nGuiones:')
  data.guiones.forEach((g, i) => console.log(`  ${i + 1}) ${g.title}  (${g.id})`))
  const n = parseInt(await ask('Número a eliminar'), 10)
  if (isNaN(n) || n < 1 || n > data.guiones.length) {
    console.log('Selección inválida.')
    return
  }
  const guion = data.guiones[n - 1]
  const confirm = await ask(`¿Eliminar "${guion.title}"? (s/n)`, 'n')
  if (!confirm.toLowerCase().startsWith('s')) {
    console.log('Cancelado.')
    return
  }
  data.guiones.splice(n - 1, 1)
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n')
  console.log(`\n✅ Guion "${guion.title}" eliminado.`)
}

async function deleteClient() {
  const clients = listClients()
  if (clients.length === 0) {
    console.log('\nNo hay clientes.')
    return
  }
  console.log('\nClientes:')
  clients.forEach((c, i) => console.log(`  ${i + 1}) ${c.name}  (${c.slug}) — ${c.count} guion(es)`))
  const n = parseInt(await ask('Número a eliminar'), 10)
  if (isNaN(n) || n < 1 || n > clients.length) {
    console.log('Selección inválida.')
    return
  }
  const client = clients[n - 1]
  const confirm = await ask(`¿Eliminar el cliente "${client.name}" y todos sus guiones? (s/n)`, 'n')
  if (!confirm.toLowerCase().startsWith('s')) {
    console.log('Cancelado.')
    return
  }
  const jsonPath = path.join(CLIENTS_DIR, `${client.slug}.json`)
  if (fs.existsSync(jsonPath)) fs.unlinkSync(jsonPath)
  const htmlDir = path.join(GUIONES_DIR, client.slug)
  if (fs.existsSync(htmlDir)) fs.rmSync(htmlDir, { recursive: true, force: true })
  const srcDir = path.join(SRC_GUIONES_DIR, client.slug)
  if (fs.existsSync(srcDir)) fs.rmSync(srcDir, { recursive: true, force: true })
  if (fs.existsSync(VITE_CONFIG)) {
    let content = fs.readFileSync(VITE_CONFIG, 'utf8')
    const line = `        ${client.slug}: 'guiones/${client.slug}/index.html',\n`
    content = content.replace(line, '')
    fs.writeFileSync(VITE_CONFIG, content)
  }
  console.log(`\n✅ Cliente "${client.name}" eliminado.`)
}


async function menuClientes() {
  while (true) {
    console.log('\n  --- CLIENTES ---')
    console.log('  1) Mostrar clientes existentes')
    console.log('  2) Nuevo cliente')
    console.log('  3) Eliminar cliente')
    console.log('  4) Volver')
    const opt = await ask('Opción')
    if (opt === '1') {
      await showClients()
    } else if (opt === '2') {
      await newClient()
    } else if (opt === '3') {
      await deleteClient()
    } else if (opt === '4') {
      break
    } else {
      console.log('Opción inválida.')
    }
  }
}

async function menuGuiones() {
  while (true) {
    console.log('\n  --- GUIONES ---')
    console.log('  1) Ver guiones de un cliente')
    console.log('  2) Agregar guion a cliente existente')
    console.log('  3) Eliminar guion')
    console.log('  4) Volver')
    const opt = await ask('Opción')
    if (opt === '1') {
      await showGuiones()
    } else if (opt === '2') {
      const slug = await chooseClient()
      if (slug) await addGuion(slug)
    } else if (opt === '3') {
      await deleteGuion()
    } else if (opt === '4') {
      break
    } else {
      console.log('Opción inválida.')
    }
  }
}


async function showGuiones() {
  const slug = await chooseClient()
  if (!slug) return
  const jsonPath = path.join(CLIENTS_DIR, `${slug}.json`)
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
  console.log(`\n┌──────────────────────────────┐`)
  console.log(`│  GUIONES — ${data.clientName}`.padEnd(33, ' ') + '│')
  console.log('└──────────────────────────────┘')
  if (!Array.isArray(data.guiones) || data.guiones.length === 0) {
    console.log('  (ninguno)')
    return
  }
  data.guiones.forEach((g, i) => {
    console.log(`  ${i + 1}) ${g.title}`)
    console.log(`     id: ${g.id}`)
    console.log(`     duración: ${g.duracion}  |  formato: ${g.formato}`)
    console.log(`     escenas: ${Array.isArray(g.escenas) ? g.escenas.length : 0}`)
  })
}


async function main() {
  ensureDirs()
  console.log('\n╔══════════════════════════════════╗')
  console.log('║   Gestor de guiones · luisvfx.ai ║')
  console.log('╚══════════════════════════════════╝')

  while (true) {
    console.log('\n  1) Clientes')
    console.log('  2) Guiones')
    console.log('  3) Salir')
    const opt = await ask('Opción')
    if (opt === '1') {
      await menuClientes()
    } else if (opt === '2') {
      await menuGuiones()
    } else if (opt === '3') {
      break
    } else {
      console.log('Opción inválida.')
    }
  }
  rl.close()
  console.log('\nHasta luego. Recuerda correr "npm run build" para verificar.\n')
}

main().catch((err) => {
  console.error(err)
  rl.close()
  process.exit(1)
})
