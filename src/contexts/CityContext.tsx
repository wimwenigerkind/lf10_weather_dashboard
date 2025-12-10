import {createContext, type ReactNode, useContext, useState} from "react";
import type {citySearchResult} from "../types/citySearchResult.ts";

type CityContextType = {
  selectedCity: citySearchResult | undefined;
  setSelectedCity: (value: citySearchResult) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export function CityProvider({children}: { children: ReactNode }) {
  const [selectedCity, setSelectedCity] = useState<citySearchResult | undefined>(undefined);

  return (
    <CityContext.Provider value={{selectedCity, setSelectedCity}}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw Error("useCity must be used within a CityProvider")
  }
  return context;
}

export default CityContext;
