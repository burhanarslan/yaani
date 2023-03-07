import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {pluck, Subject} from "rxjs";
import {debounceTime, first, takeUntil} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {RouterDataService} from "@shared";
import {Unsubscriber} from "@utils/unsubscriber";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends Unsubscriber{
  @Output('sideBarVisible')
  public sideBarVisibleEvent = new EventEmitter<boolean>();
  public sideBarVisible = false;
  public searchEventAction$ = new Subject<string>();
  public search$ = this.routerData.queries$.pipe(pluck('search'));

  constructor(private router: Router, private route: ActivatedRoute, private routerData: RouterDataService) {
    super();
    this.searchEventAction$.pipe(debounceTime(500), takeUntil(this.onDestroy$)).subscribe(text => {
      return this.filterBySearchText(text)
    })
  }


  private async filterBySearchText(text: string) {
    const queries = await this.routerData.queries$.pipe(first()).toPromise();
    if (text) {
      await this.router.navigate(['./'], {
        queryParams: {
          ...queries,
          search: text
        }
      })
    } else {
      delete queries['search']
      await this.router.navigate(['./'], {
        queryParams: {
          ...queries,
        },
      })
    }
  }
}
