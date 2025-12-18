import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: 'https://sso.wimdev.group',
  realm: 'public',
  clientId: 'lf10_weather_dashboard'
})

export default keycloak;