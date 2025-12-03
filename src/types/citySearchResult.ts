export type citySearchResult = {
    id: number;
    name: string;
    country: string;
    country_code?: string;
    latitude: number;
    longitude: number;
    population?: number;
    timezone?: string;
}