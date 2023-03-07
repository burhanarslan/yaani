import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@app/movies/movies.module').then(m => m.MoviesModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], exports: [RouterModule]
})
export class DashboardRoutingModule {
}
