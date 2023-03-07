import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MoviesService} from "@app/movies/movies.service";
import {RouterDataService} from "@shared";
import {map, pluck} from "rxjs";
import {shareLast} from "@utils/rx";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public categories$ = this.moviesService.categories$;
  public movies$ = this.moviesService.movies$;
  public activeCategory$ = this.routerData.queries$.pipe(
    pluck('category'),
    map(category => category ? category : null),
    shareLast()
  );

  constructor(private moviesService: MoviesService, private routerData: RouterDataService) {
  }

  public trackByFn(_index: number, category: { movieCount: number; name: string; }): string {
    return category.name;
  }
}
