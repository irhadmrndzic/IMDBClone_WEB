import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientService } from './services/http-client.service';
import { MoviesShowsServiceService } from './services/movies-shows-service.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';

import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingService } from './services/rating.service';
import { LoaderLinearComponent } from './loader-linear/loader-linear.component';
import { LoaderService } from './services/loader.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    LoaderLinearComponent,
    HomePageComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    InfiniteScrollModule,
    ToastModule

  ],
  providers: [HttpClientService, MoviesShowsServiceService, RatingService, MessageService, { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
