import {Component, OnInit} from '@angular/core';
import {MoviesService} from "@app/movies/movies.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  public activeMovie$ = this.service.activeMovie$;

  constructor(private service: MoviesService, private router: Router) {
  }

  ngOnInit(): void {
  }

  public async deleteMovie() {
    const movie = await this.activeMovie$.pipe(first()).toPromise();
    await this.service.deleteMovie$$.next(movie.id);
    await this.router.navigate(['../'])
  }

}
