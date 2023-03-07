import {Injectable} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map, startWith} from 'rxjs/operators';

import {shareLast} from "@utils/rx";

export function deepest<T, K extends { [P in keyof T]: T[P] extends T ? P : never }[keyof T]>(object: T, key: K): T {
  while (object[key]) {
    object = object[key] as any;
  }
  return object;
}

@Injectable({
  providedIn: 'root'
})
export class RouterDataService {
  /**
   * Emits activated route on route change
   */
  public routeChange$ = this.router.events.pipe(filter(e => e instanceof NavigationEnd), startWith(null));

  /**
   * Emits deepest route on route change
   */
    // @ts-ignore
  public deepestRoute$ = this.routeChange$.pipe(map(() => deepest(this.route, 'firstChild')));

  /**
   * Emits all active routes (from root to deepest child) on route change
   */
  public activeRoutes$ = this.deepestRoute$.pipe(map(r => r.pathFromRoot));

  /**
   * Emits route parameters ıb route change
   */
  public params$: Observable<Params> = this.activeRoutes$.pipe(
    map(routes => routes.map(r => r.snapshot)),
    map(routes => routes.filter(r => !!r).map(r => r.params)),
    map(params => params.reduce((obj, next) => ({...obj, ...next}), {}))
  );

  /**
   * Emits route segments ()
   */
  public segments$ = this.activeRoutes$.pipe(
    map(routes => routes.map(r => r.snapshot)),
    map(routes => routes.filter(r => !!r).map(r => r.url[0])),
    map(segments => segments.filter(s => !!s)),
    map(segments => segments.map(s => s.path))
  );

  public queries$ = this.activeRoutes$.pipe(
    map(routes => routes.map(r => r.snapshot)),
    map(routes => routes.filter(r => !!r).map(r => r.queryParams)),
    map(params => params.reduce((acc, p) => ({...acc, ...p}), {})),
    shareLast()
  );


  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }
}

