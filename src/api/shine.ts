// Client for the Shine API served by mcp-server (`npm run api` there).
// Types mirror mcp-server/src/domain/types.ts.

export interface ApiItem {
  id: string;
  name: string;
  category: string;
  colors: string[];
  seasons: string[];
  styles: string[];
  formality: number;
  imageUrl?: string;
  createdAt: string;
}

export interface ApiOutfitSummary {
  id: string;
  name: string;
  situation: string;
}

export interface ApiOutfit extends ApiOutfitSummary {
  comment?: string;
  items: ApiItem[];
  createdAt: string;
}

// Same host the app was opened from, so it also works from a phone on the LAN.
const BASE_URL: string =
  import.meta.env.VITE_SHINE_API_URL ??
  `${window.location.protocol}//${window.location.hostname}:8787`;

/** Uploaded photos come back root-relative (/images/…); external ones are absolute. */
export const photoUrl = (url: string) =>
  url.startsWith("/") ? `${BASE_URL}${url}` : url;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    signal: AbortSignal.timeout(3000),
  });
  if (!res.ok) throw new Error(`Shine API ${path}: ${res.status}`);
  return res.json();
}

export const fetchItems = () =>
  request<{ items: ApiItem[] }>("/api/items").then((r) => r.items);
export const fetchItem = (id: string) =>
  request<{ item: ApiItem; outfits: ApiOutfitSummary[] }>(
    `/api/items/${encodeURIComponent(id)}`,
  );
export const fetchOutfits = () =>
  request<{ outfits: ApiOutfit[] }>("/api/outfits").then((r) => r.outfits);
export const fetchOutfit = (id: string) =>
  request<ApiOutfit>(`/api/outfits/${encodeURIComponent(id)}`);

export const deleteItem = (id: string) =>
  request(`/api/items/${encodeURIComponent(id)}`, { method: "DELETE" });
export const deleteOutfit = (id: string) =>
  request(`/api/outfits/${encodeURIComponent(id)}`, { method: "DELETE" });
