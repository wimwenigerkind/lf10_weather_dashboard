import {createContext, type ReactNode, useEffect, useState} from "react";
import type {citySearchResult} from "../types/citySearchResult.ts";

export type CityContextType = {
  selectedCity: citySearchResult | undefined;
  setSelectedCity: (value: citySearchResult | null) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export { CityContext };

export function CityProvider({children}: { children: ReactNode }) {
  const [selectedCity, setSelectedCity] = useState(() => {
    const saved = localStorage.getItem('selectedCity');
    return saved ? JSON.parse(saved) : undefined
  });

  useEffect(() => {
    if (selectedCity) {
      localStorage.setItem('selectedCity', JSON.stringify(selectedCity))
    } else {
      localStorage.removeItem('selectedCity')
    }
  }, [selectedCity]);

  return (
    <CityContext.Provider value={{selectedCity, setSelectedCity}}>
      {children}
    </CityContext.Provider>
  );
}
