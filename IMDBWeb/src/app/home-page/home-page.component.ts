import { Component, OnInit } from '@angular/core';
import { MoviesShowsItem } from '../Interfaces/MoviesShowsItem';
import { MoviesShowsServiceService } from '../services/movies-shows-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  moviesShows: any[] = [];
  constructor(public moviesService: MoviesShowsServiceService) {
    this.moviesService.getMovies().subscribe(res => {
      console.log("res", res);

      this.moviesShows = res;
    })

  }

  ngOnInit() {

  }





}
