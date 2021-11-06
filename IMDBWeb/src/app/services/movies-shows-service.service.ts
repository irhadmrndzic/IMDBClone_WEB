import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MoviesShowsItem } from '../Interfaces/MoviesShowsItem';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesShowsServiceService {

  private moviesApiUrl = environment.apiUrl + "Movies";

  constructor(public httpService: HttpClientService) { }


  getMovies() {
    return this.httpService.get(`${this.moviesApiUrl}`)
      .pipe(map((resp) => {
        resp.forEach(item => {
          item.coverImage = "data:image/png;base64," + item.coverImage;
          item.releaseDate = (new Date(item.releaseDate)).getFullYear();
        });
        return resp;
      }));
  }
}
