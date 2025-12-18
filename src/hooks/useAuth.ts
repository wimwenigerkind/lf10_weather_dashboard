import {useKeycloak} from "@react-keycloak/web";

export function useAuth() {
  const {keycloak, initialized} = useKeycloak();

  return {
    isAuthenticated: keycloak.authenticated,
    user: keycloak.tokenParsed,
    login: () => keycloak.login(),
    logout: () => keycloak.logout(),
    token: keycloak.token,
    initialized
  };
}