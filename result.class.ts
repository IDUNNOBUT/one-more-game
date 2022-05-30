export interface Result {
  name: string,
  id: number,
  background_image: string;
  released: string;
  metacritic: number;
  platforms: Platform[]
}
export interface Platform {
  platform: Platform2
  released_at: string
}

export interface Platform2 {
  id: number
  slug: string
  name: string
}
