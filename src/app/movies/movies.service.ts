import {Injectable} from '@angular/core';
import {RouterDataService} from "@shared";
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  merge,
  Observable,
  pluck, scan,
  shareReplay,
  startWith,
  Subject,
  switchMap
} from "rxjs";
import {Movie} from "@app/movies/model";
import {HttpClient} from "@angular/common/http";
import {shareLast} from "@utils/rx";
import {debounceTime} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  public addMovie$$ = new Subject<Partial<Movie>>();
  public deleteMovie$$ = new Subject<string>();
  public filterData$ = new BehaviorSubject<{ [key: string]: string }>(null);


  private productDeleted$ = this.deleteMovie$$.pipe(
    switchMap((id) => this.deleteMovie(id))
  );

  private movieActionEvent$ = merge(this.productDeleted$);
  public movies$: Observable<Movie[]> = this.movieActionEvent$.pipe(
    startWith(null),
    switchMap(() => this.http.get<Movie[]>('/list').pipe(
      switchMap(movies => {
        return this.addMovie$$.pipe(
          scan<Movie, Movie[]>((acc, movie: Movie) => {
            return movie ? [...acc, movie] : acc;
          }, movies),
          startWith(movies),
          shareLast()
        );
      })
    )),
    shareLast()
  );
  public movieList$: Observable<Movie[]> = combineLatest([this.movies$, this.filterData$]).pipe(
    map(([movies, filterData]) => {
      if (filterData['category']) {
        return this.filterByCategory(filterData['sortType'] ?
            this.sortOrder(movies, {sortType: filterData['sortType'], orderType: filterData['orderType']}) : movies,
          {category: filterData['category'], search: filterData['search']});
      }
      return filterData['search'] ? this.filterBySearch(filterData['sortType'] ?
        this.sortOrder(movies, {
          sortType: filterData['sortType'],
          orderType: filterData['orderType']
        }) : movies, filterData['search']) : filterData['sortType'] ?
        this.sortOrder(movies, {
          sortType: filterData['sortType'],
          orderType: filterData['orderType']
        }) : movies;
    }),
    shareLast()
  );
  public activeMovie$ = combineLatest(
    [this.movies$,
    this.routerDataService.params$.pipe(pluck('movieId'), distinctUntilChanged())]).pipe(
    map(([movies, movieId]) => {
      if (!movieId) {
        return null
      }
      return movies.find(movie => movie.id === movieId)
    }),
    shareLast()
  )

  public categories$ = this.movies$.pipe(
    map(data => {
      let categories = {}
      data.forEach((item) => {
        item.genre.forEach((cat) => {
          categories = categories[cat] ? {
            ...categories, [cat]: {
              name: cat,
              movieCount: categories[cat].movieCount + 1
            }
          } : {
            ...categories, [cat]: {
              name: cat,
              movieCount: 1
            }
          }

        }, {})
      })
      return Object.keys(categories).map(item => categories[item]).sort((a, b) => {
        return compare(a.name, b.name, true);
      })
    }),
    shareReplay({refCount: false, bufferSize: 1})
  )

  constructor(private http: HttpClient, private routerDataService: RouterDataService) {
    this.movies$.pipe(debounceTime(5000)).subscribe(_ => {
      this.addMovie$$.next(new Movie({
        ..._[Math.floor(Math.random() * 15)],
        id: Math.floor(Math.random() * 100000000000).toString(),
      }))
    })
  }


  /**
   * Delete Movie
   * @param id
   * @private
   */
  private deleteMovie(id: string) {
    return this.http.delete('/delete', {params: {movieId: id}});
  }

  /**
   * Filter By Category and Search Text
   * @param movies
   * @param filterData
   */
  public filterByCategory(movies: Movie[], filterData: { search: string; category: string }) {
    const result = movies.filter(movie => movie.genre.includes(filterData.category));
    return filterData.search ? this.filterBySearch(result, filterData.search) : result;
  }

  /**
   * Filter By Search Text
   * @param movies
   * @param search
   */
  public filterBySearch(movies: Movie[], search: string) {
    return movies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()));
  }

  /**
   *
   * @param movies
   * @param filterData
   */
  public sortOrder(movies: Movie[], filterData: { sortType: string, orderType: string }) {
    return movies.sort((a, b) => {
      const isAsc = filterData.orderType === 'asc';
      if (filterData.sortType === 'title') {
        return compare(a[filterData.sortType], b[filterData.sortType], isAsc);
      }
      return compare(+a[filterData.sortType], +b[filterData.sortType], isAsc);
    });

  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
