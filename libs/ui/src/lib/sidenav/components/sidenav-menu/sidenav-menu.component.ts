import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { SidenavElement } from '../../interfaces';

import { SidenavMenuElementComponent } from '../sidenav-menu-element/sidenav-menu-element.component';
import { IconComponent } from '../../../icon';
import { DeviceService } from '../../../../../../common/src/lib/services/device.service';

@Component({
  selector: 'skt-ui-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrl: './sidenav-menu.component.scss',
  standalone: true,
  imports: [SidenavMenuElementComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
})
export class SidenavMenuComponent {
  @Input() elements: SidenavElement[] = [];

  constructor(classBinder: ClassBinder, public device: DeviceService) {
    classBinder.bind('skt-ui-sidenav-menu');
  }
}
