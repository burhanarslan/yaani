import {Component, HostListener, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger("inOutPaneAnimation", [
      state('enter', style({
        'grid-template-columns': '200px 1fr'
      })),
      state('leave', style({
        'grid-template-columns': '0px 1fr'
      })),
      transition('enter => leave', [
        animate('.2s')
      ]),
      transition('leave => enter', [
        animate('0.2s')
      ]),
    ])
  ]
})
export class DashboardComponent {
  public sideBarVisible$ = new BehaviorSubject(window.innerWidth > 768)

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.sideBarVisible$.next(event.target.innerWidth > 768)
  }

  constructor() {
  }

}
