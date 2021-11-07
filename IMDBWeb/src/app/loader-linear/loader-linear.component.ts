import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderState } from '../Interfaces/LoaderState';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-loader-linear',
  templateUrl: './loader-linear.component.html',
  styleUrls: ['./loader-linear.component.scss']
})
export class LoaderLinearComponent implements OnInit, OnDestroy {

  show = false;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
      this.show = state.show;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
