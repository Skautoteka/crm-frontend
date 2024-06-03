import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { DeviceService } from '../../../../../../common/src/lib/services/device.service';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'skt-ui-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
  imports: [RouterOutlet, AsyncPipe],
})
export class SidenavMenuComponent {
  @Input() header = '';
  @Input() subHeader = '';

  public device = inject(DeviceService);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-content');
  }
}
