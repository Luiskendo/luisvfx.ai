import { useState } from 'react'
import type { ClienteData, Guion } from '../types/guiones'
import GuionesPanel from './GuionesPanel'
import GuionViewer from './GuionViewer'

export default function ClienteGuiones({ clientName, logoSrc, guiones }: ClienteData) {
  const [selected, setSelected] = useState<Guion | null>(null)

  if (selected) {
    return <GuionViewer guion={selected} onBack={() => setSelected(null)} />
  }

  return (
    <GuionesPanel
      clientName={clientName}
      logoSrc={logoSrc}
      guiones={guiones.map((g) => ({ id: g.id, title: g.title }))}
      onSelectGuion={(id) => {
        const found = guiones.find((g) => g.id === id)
        if (found) setSelected(found)
      }}
    />
  )
}
