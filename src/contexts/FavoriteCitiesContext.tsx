import {createContext, type ReactNode, useEffect, useState} from "react";
import type {citySearchResult} from "../types/citySearchResult.ts";

export type FavoriteCitiesContextType = {
  favoriteCities: citySearchResult[];
  toggleFavoriteCity: (city: citySearchResult) => void;
  removeFavoriteCity: (cityId: number) => void;
  isFavoriteCity: (cityId: number) => boolean;
}

const FavoriteCitiesContext = createContext<FavoriteCitiesContextType | undefined>(undefined);

export { FavoriteCitiesContext };

export function FavoriteCitiesProvider({children}: { children: ReactNode }) {
  const localStorageItem = 'favoriteCities';
  const [favoriteCities, setFavoriteCities] = useState<citySearchResult[]>(() => {
    const saved = localStorage.getItem(localStorageItem);
    return saved ? JSON.parse(saved) : []
  });

  useEffect(() => {
    if (favoriteCities.length > 0) {
      localStorage.setItem(localStorageItem, JSON.stringify(favoriteCities))
    } else {
      localStorage.removeItem(localStorageItem)
    }
  }, [favoriteCities]);

  const toggleFavoriteCity = (city: citySearchResult) => {
    if (!favoriteCities.some(c => c.id === city.id)) {
      setFavoriteCities(prev => [...prev, city]);
    } else {
      removeFavoriteCity(city.id)
    }
  };

  const removeFavoriteCity = (cityId: number) => {
    setFavoriteCities(prev => prev.filter(c => c.id !== cityId));
  };

  const isFavoriteCity = (cityId: number):boolean => {
    return favoriteCities.some(c => c.id === cityId);
  }

  return (
    <FavoriteCitiesContext.Provider value={{favoriteCities, toggleFavoriteCity, removeFavoriteCity, isFavoriteCity}}>
      {children}
    </FavoriteCitiesContext.Provider>
  );
}
