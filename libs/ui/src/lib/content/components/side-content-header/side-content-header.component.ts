import { ChangeDetectionStrategy, Component, ViewEncapsulation, input, Output, EventEmitter } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AsyncPipe } from '@angular/common';
import { IconComponent } from '../../../icon';
import { DeviceService } from '../../../../../../common/src/lib/services/device.service';
import { ContentService } from '../../services';

@Component({
  selector: 'skt-ui-side-content-header',
  templateUrl: './side-content-header.component.html',
  styleUrl: './side-content-header.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
  imports: [AsyncPipe, IconComponent]
})
export class SideContentHeaderComponent {
  @Output() mobileBackClick = new EventEmitter<void>();

  public title = input<string>('');

  constructor(classBinder: ClassBinder, public device: DeviceService, private _content: ContentService) {
    classBinder.bind('skt-ui-side-content-header');
  }

  public onMobileBackClick(): void {
    this._content.showSideContent(false);
    this.mobileBackClick.emit();
  }
}
