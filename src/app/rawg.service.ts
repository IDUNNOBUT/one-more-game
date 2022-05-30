import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Result} from 'result.class';

@Injectable({
  providedIn: 'root'
})
export class RawgService {
  RAWG_URL = 'https://api.rawg.io/api/'
  COMPRESS_URL = 'https://api.resmush.it/ws.php'
  YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search'
  key = 'fadcc54359414e4ea1f38bc8296f76bf'
  y_key = ''

  constructor(private http: HttpClient) {
  }

  searchResults: Result[] = []

  Search(search: string): Promise<Object | undefined> {
    const param = new HttpParams().append('key', this.key).append('page_size', 3).append('search', search).append('page', 1)
    return this.http.get(`${this.RAWG_URL}games`, {params: param}).toPromise();
  }

  GetGameList(orderBy: string, page = 1): Promise<Object | undefined> {
    const param = new HttpParams().append('key', this.key).append('ordering', '-' + orderBy).append('page_size', 24).append('page', page);
    return this.http.get(`${this.RAWG_URL}games`, {params: param}).toPromise();
  }

  CompressImg(url: string, quality: number): Promise<Object | undefined> {
    const param = new HttpParams().append('img', url).append('qlty', quality);
    return this.http.get(`${this.COMPRESS_URL}`, {params: param}).toPromise();
  }

  GetGameDesc(id: number) {
    const param = new HttpParams().append('key', this.key)
    return this.http.get(`${this.RAWG_URL}games/${id}`, {params: param}).toPromise();
  }

  GetGameTrailer(name: string) {
    const param = new HttpParams().append('key', this.y_key).append('maxResults', 1).append('q', name + '_trailer')
    return this.http.get(`${this.YOUTUBE_URL}`, {params: param}).toPromise();
  }

  GetAchievements(id: number) {
    const param = new HttpParams().append('key', this.key);
    return this.http.get(`${this.RAWG_URL}games/${id}/achievements`, {params: param}).toPromise();
  }
}
