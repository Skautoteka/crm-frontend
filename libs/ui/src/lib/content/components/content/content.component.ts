import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ClassBinder, DeviceService } from '@skautoteka-frontend/common';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ContentService } from '../../services';
import { IconComponent } from '../../../icon';

@Component({
  selector: 'skt-ui-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder, ContentService],
  imports: [RouterOutlet, AsyncPipe, IconComponent]
})
export class ContentComponent {
  @Input() header = '';
  @Input() subHeader = '';

  constructor(classBinder: ClassBinder, public device: DeviceService) {
    classBinder.bind('skt-ui-content');
  }
}
