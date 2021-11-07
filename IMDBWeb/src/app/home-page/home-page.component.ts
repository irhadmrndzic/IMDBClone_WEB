import { Component, OnInit } from '@angular/core';
import { MoviesShowsServiceService } from '../services/movies-shows-service.service';
import { RatingService } from '../services/rating.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  moviesShows: any[] = [];
  pageNumber = 1;
  pageSize = 10;
  totalCount: any;
  hasNext: any;
  loading: boolean;
  constructor(public moviesService: MoviesShowsServiceService, public ratingService: RatingService, private messageService: MessageService) {
    this.loadData();
  }
  ngOnInit() {

  }

  public loadData() {
    this.loading = true;

    this.moviesService.getMovies(this.pageNumber, this.pageSize).subscribe(res => {
      var obj = JSON.parse(res.headers.get("x-pagination"));
      this.totalCount = obj.TotalCount;
      this.hasNext = obj.HasNext;
      this.loading = false;

      this.moviesShows = res.body;
    }, err => {
      this.loading = false;

      this.toastService("error", "Error", "Error on data load.");
    });
  }

  public loadMoreDataOnScroll() {
    if (this.hasNext) {
      this.loading = true;
      this.pageNumber++;
      this.moviesService.getMovies(this.pageNumber, this.pageSize).subscribe(res => {
        if (res) {
          var obj = JSON.parse(res.headers.get("x-pagination"));
          this.totalCount = obj.TotalCount;
          this.hasNext = obj.HasNext;
          this.moviesShows.push(...res.body);
          this.loading = false;
        }
      }, err => {
        this.loading = false;
        this.toastService("error", "Error", "Error on data load.");
      })
    }
  }

  toastService(severity?, summary?, detail?) {
    if (severity == "success") {
      this.messageService.add({ severity: 'success', summary: summary, detail: detail });
    } else if (severity == "error") {
      this.messageService.add({ severity: 'error', summary: summary, detail: detail });

    }
  }

  clear() {
    this.messageService.clear();
  }


  public rateMovie(movieId, ratingN) {
    this.ratingService.rateMovie(movieId, ratingN).subscribe(res => {
      if (res) {
        this.toastService("success", "Success", "Movie rated.");
      }
    }, err => {
      console.log(err);

      this.toastService("error", "Error", "Error on rating movie. ");

    });
  }
}
