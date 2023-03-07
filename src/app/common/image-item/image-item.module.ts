import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ImageItemComponent } from '@common/image-item/image-item.component';
import {MatGridListModule} from "@angular/material/grid-list";


@NgModule({
  declarations: [ImageItemComponent],
  imports: [
    CommonModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [ImageItemComponent]
})
export class ImageItemModule {
}
