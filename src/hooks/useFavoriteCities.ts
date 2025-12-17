import {useContext} from "react";
import {FavoriteCitiesContext} from "../contexts/FavoriteCitiesContext.tsx";

export function useFavoriteCities() {
  const context = useContext(FavoriteCitiesContext);
  if (context === undefined) {
    throw Error("useFavoriteCities must be used within a FavoriteCitiesProvider")
  }
  return context;
}