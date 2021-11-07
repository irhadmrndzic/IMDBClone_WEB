import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  apiUrl: string = "https://localhost:44368/api/";

  private ratingsApiUrl = this.apiUrl + "Ratings";

  constructor(public httpClientService: HttpClient) { }

  public rateMovie(movieId, ratingNumber) {
    return this.httpClientService.post(this.ratingsApiUrl, { MovieId: movieId, RatingNumber: ratingNumber });
  }
}
