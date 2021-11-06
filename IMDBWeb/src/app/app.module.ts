import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { HttpClientService } from './services/http-client.service';
import { MoviesShowsServiceService } from './services/movies-shows-service.service';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [HttpClientService, MoviesShowsServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
