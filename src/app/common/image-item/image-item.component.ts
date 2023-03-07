import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.scss']
})
export class ImageItemComponent {
  @Input()
  public wide = false;

  @Input()
  public wideSize = 0;

  @Input()
  public avatar = false;

  @Input()
  public image = true;

  @Input()
  public cols = 4;

  public get imageSize(): number {
    return this.image ? this.avatar ? 4 : 8 : 0;
  }

  public get midSize(): number {
    return this.wide ? 24 - this.imageSize : 24 - (this.wideSize + this.imageSize);
  }

}
