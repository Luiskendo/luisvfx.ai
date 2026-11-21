import { createRoot } from 'react-dom/client'
import '../../index.css'
import ClienteGuiones from '../../components/ClienteGuiones'
import cliente from '../../data/clientes/bombillo_prieto.json'

createRoot(document.getElementById('root')!).render(<ClienteGuiones {...cliente} />)
