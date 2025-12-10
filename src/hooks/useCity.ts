import {useContext} from "react";
import {CityContext} from "../contexts/CityContext.tsx";

export function useCity() {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw Error("useCity must be used within a CityProvider")
  }
  return context;
}