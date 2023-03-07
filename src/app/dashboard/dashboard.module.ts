import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {HeaderModule} from "./header/header.module";
import {SidebarModule} from "./sidebar/sidebar.module";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HeaderModule,
    SidebarModule,
  ]
})
export class DashboardModule { }
