import {Component, OnInit} from '@angular/core';
import {MoviesService} from "@app/movies/movies.service";
import {RouterDataService} from "@shared";
import {BehaviorSubject, combineLatest, map, startWith, Subject, switchMap} from "rxjs";
import {shareLast} from "@utils/rx";
import {PageEvent} from "@angular/material/paginator";
import {debounceTime, first, takeUntil} from "rxjs/operators";
import {Movie, SortModel} from "@app/movies/model";
import {Unsubscriber} from "@utils/unsubscriber";
import * as assert from "assert";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent extends Unsubscriber {
  public sortData: SortModel[] = [
    {
      id: 'title_asc',
      title: 'Ada Göre Artan',
      sortType: 'title',
      orderType: 'asc',
    },
    {
      id: 'title_desc',
      title: 'Ada Göre Azalan',
      sortType: 'title',
      orderType: 'desc',
    },
    {
      id: 'imdbRating_asc',
      title: 'imdb Artan',
      sortType: 'imdbRating',
      orderType: 'asc',
    },
    {
      id: 'imdbRating_desc',
      title: 'imdb Azalan',
      sortType: 'imdbRating',
      orderType: 'desc',
    },
  ]
  public pageIndex$ = new BehaviorSubject<number>(0)
  public moviesLength = 0;
  public pageSize = 12;
  public activeSort$ = this.routerData.queries$.pipe(
    map(data => data['sortType'] ? data['sortType'] + '_' + data['orderType'] : null),
    shareLast()
  )
  public movies$ = this.service.movieList$.pipe(
    switchMap(data => this.pageIndex$.pipe(
      map((pageIndex: number) => {
        this.moviesLength = data.length
        return data.slice(pageIndex * this.pageSize, (pageIndex * this.pageSize) + this.pageSize);
      })
    )),
    takeUntil(this.onDestroy$),
    shareLast()
  )

  public activeMovie$ = this.service.activeMovie$;

  constructor(private service: MoviesService, private routerData: RouterDataService, private router: Router) {
    super()
    this.routerData.queries$.pipe(takeUntil(this.onDestroy$)).subscribe(data => {
      this.service.filterData$.next(data);
      this.pageIndex$.next(0);
    })
  }

  public changeSort(id: string) {
    const activeSort = this.sortData.find(item => item.id === id)
    return this.changeQueryParams({sortType: activeSort.sortType, orderType: activeSort.orderType})
  }

  public async changeQueryParams(data: { [key: string]: string | number }) {
    const queryParams = await this.routerData.queries$.pipe(first()).toPromise();
    await this.router.navigate(['./'], {
      queryParams: {
        ...queryParams,
        ...data
      }
    })
  }

  public trackByFn(_index: number, movie: Movie): string {
    return movie.id;
  }

}
