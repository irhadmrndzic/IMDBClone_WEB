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


  getMovies(pageNumber, pageSize, searchTerm?, type?) {
    let params = `?PageNumber=${pageNumber}&PageSize=${pageSize}`

    if (searchTerm) {
      params = `${params}&Search=${searchTerm}`;
    }

    params = `${params}&Type=${type}`;

    return this.httpService.get(`${this.moviesApiUrl}` + params)
      .pipe(map((resp) => {

        resp.body.forEach(item => {
          item.coverImage = "data:image/png;base64," + item.coverImage;
          item.releaseDate = (new Date(item.releaseDate)).getFullYear();
        });
        return resp;
      }));
  }


}
