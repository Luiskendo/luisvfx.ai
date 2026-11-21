export interface Escena {
  label?: string
  locucion: string
  visual: string
}

export interface Guion {
  id: string
  title: string
  duracion: string
  formato: string
  escenas: Escena[]
  cierre: string
}

export interface ClienteData {
  clientName: string
  logoSrc: string
  guiones: Guion[]
}
