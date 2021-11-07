import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  searchForm: FormGroup;
  queryField: FormControl = new FormControl();
  constructor(public formBuilder: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.queryField.valueChanges.pipe(
      debounceTime(800),
      distinctUntilChanged(),
    )
      .subscribe((queryField) => {
        if (queryField.length > 2) {

          if (this.router.url == "/movies") {
            this.router.navigateByUrl(`/movies?Search=${queryField}&Type="${0}"`);
          }
          else if (this.router.url == "/shows") {
            this.router.navigateByUrl(`/shows?Search=${queryField}&Type="${1}"`);
          } else {
            this.router.navigateByUrl(`/home?Search=${queryField}`);
          }
        }
        if (queryField.length == 0) {
          var url = this.router.url.toString();

          if (url.includes("/movies")) {

            this.router.navigateByUrl("/movies");
          }
          if (url.includes("/shows")) {

            this.router.navigateByUrl("/shows");
          } else if (url.includes("/home")) {
            this.router.navigateByUrl("/home");
          }
        }
      });
  }

  clearSearch() {
    this.queryField.setValue("");
  }


}
