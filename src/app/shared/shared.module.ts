import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {DummyInterceptor} from "@shared/interceptor/dummy.interceptor";

const MODULES = [
  CommonModule,
  HttpClientModule
];

@NgModule({
  declarations: [],
  imports: [
    ...MODULES,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DummyInterceptor,
      multi: true,
    }
  ],
  exports: [
    ...MODULES
  ]
})
export class SharedModule {
}
