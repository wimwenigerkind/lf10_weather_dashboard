import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css'
import {CityProvider} from "./contexts/CityContext.tsx";
import {ToastProvider} from "./contexts/ToastContext.tsx";
import {FavoriteCitiesProvider} from "./contexts/FavoriteCitiesContext.tsx";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./config/keycloak.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        pkceMethod: 'S256'
      }}
    >
      <CityProvider>
        <ToastProvider>
          <FavoriteCitiesProvider>
            <App/>
          </FavoriteCitiesProvider>
        </ToastProvider>
      </CityProvider>
    </ReactKeycloakProvider>
  </StrictMode>,
)
