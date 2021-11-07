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
    this.createForm();
    this.queryField.valueChanges.pipe(
      debounceTime(800),
      distinctUntilChanged(),
    )
      .subscribe((queryField) => {
        if (queryField.length > 2) {
          this.router.navigateByUrl(`/home?Search=${queryField}`);
        }
        if (queryField.length == 0) {
          this.router.navigateByUrl("/home");
        }
      });


  }

  public createForm() {
    this.searchForm = this.formBuilder.group({
      searchTerm: ['']
    });
  }

  public search() {

  }
}
