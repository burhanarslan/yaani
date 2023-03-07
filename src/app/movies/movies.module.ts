import { NgModule } from '@angular/core';
import { MoviesComponent } from './movies.component';
import {MoviesRoutingModule} from "@app/movies/movies-routing.module";
import {SharedModule} from "@shared";
import {MatIconModule} from "@angular/material/icon";
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {ImageItemModule} from "@common/image-item";
import {SectionModule} from "@common/section";
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
    MoviesComponent,
    MovieDetailComponent
  ],
  imports: [
    SharedModule,
    MoviesRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ImageItemModule,
    SectionModule,
    MatCardModule
  ]
})
export class MoviesModule { }
