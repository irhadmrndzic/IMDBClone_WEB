import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';



const routes: Routes = [
  { path: '', redirectTo: "home", pathMatch: "full", data: { type: "" } },
  { path: 'home', component: HomePageComponent, data: { type: "" } },
  { path: 'movies', component: HomePageComponent, data: { type: 0 } },
  { path: 'shows', component: HomePageComponent, data: { type: 1 } }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
