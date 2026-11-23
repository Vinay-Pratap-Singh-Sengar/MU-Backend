import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Test from './Test'
import Test2 from './Test2'
import UseState from './UseState'
import Counter from './Counter'
import App from './App'
import Comp1 from './Comp1'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Comp1 />
  </StrictMode>,
)
