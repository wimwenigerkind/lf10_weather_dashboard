import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css'
import {CityProvider} from "./contexts/CityContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CityProvider>
      <App/>
    </CityProvider>
  </StrictMode>,
)
