import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MoviesComponent} from "@app/movies/movies.component";
import {MovieDetailComponent} from "@app/movies/movie-detail/movie-detail.component";

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    children: [
      {
        path: ':movieId',
        component: MovieDetailComponent,
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)], exports: [RouterModule]
})
export class MoviesRoutingModule {
}
