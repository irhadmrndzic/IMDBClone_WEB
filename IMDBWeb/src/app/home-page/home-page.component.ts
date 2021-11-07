import { Component, OnInit } from '@angular/core';
import { MoviesShowsServiceService } from '../services/movies-shows-service.service';
import { RatingService } from '../services/rating.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
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
  searchTerm: any;
  type: any;
  constructor(public moviesService: MoviesShowsServiceService, public ratingService: RatingService, private messageService: MessageService, public route: ActivatedRoute) {
  }
  ngOnInit() {

    this.type = this.route.snapshot.data["type"];
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params.Search;
      this.loadData(this.searchTerm, this.type);
    });


  }

  public loadData(searchTerm?: string, type?: any) {
    this.loading = true;
    this.pageNumber = 1;
    this.moviesService.getMovies(this.pageNumber, this.pageSize, searchTerm, type).subscribe(res => {
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

      this.moviesService.getMovies(this.pageNumber, this.pageSize, this.searchTerm, this.type).subscribe(res => {
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
      this.toastService("error", "Error", "Error on rating movie. ");
    });
  }
}
