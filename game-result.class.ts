export class GameResult {
  id = 0;
  slug = '';
  name= '';
  name_original= '';
  description = '';
  description_raw= '';
  metacritic= 0;
  released= '';
  background_image= '';
  website= '';
  rating= 0;
  ratings: Ratings = new class implements Ratings {}
  added= 0;
  added_by_status: AddedByStatus = new class implements AddedByStatus {}
  playtime= 0;
  achievements_count= 0;
  parent_achievements_count= '';
  metacritic_url= '';
  additions_count= '';
  game_series_count= '';
  platforms: Platform[] = []
}
export interface AddedByStatus {}
export interface Platform {
  platform: Platform2
  released_at: string
  requirements: Requirements
}
export interface Platform2 {
  id: number
  slug: string
  name: string
}
export interface Requirements {
  minimum: string
  recommended: string
}
export interface Ratings {}
