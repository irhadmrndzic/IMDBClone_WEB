import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MoviesShowsItem } from '../Interfaces/MoviesShowsItem';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesShowsServiceService {
  apiUrl: string = "https://localhost:44368/api/"
  private moviesApiUrl = this.apiUrl + "Movies";

  constructor(public httpService: HttpClientService) { }


  getMovies(pageNumber, pageSize) {
    return this.httpService.get(`${this.moviesApiUrl}` + "?PageNumber=" + pageNumber + "&PageSize=" + pageSize)
      .pipe(map((resp) => {
        console.log("r", resp.body);

        resp.body.forEach(item => {
          item.coverImage = "data:image/png;base64," + item.coverImage;
          item.releaseDate = (new Date(item.releaseDate)).getFullYear();
        });
        return resp;
      }));
  }


}
