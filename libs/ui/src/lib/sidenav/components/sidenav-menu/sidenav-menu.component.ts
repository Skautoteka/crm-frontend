import { injectRouteData } from 'ngxtension/inject-route-data';
import { ChangeDetectionStrategy, Component, output, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { SidenavElement } from '../../interfaces';

import { SidenavMenuElementComponent } from '../sidenav-menu-element/sidenav-menu-element.component';
import { IconComponent } from '../../../icon';

@Component({
  selector: 'skt-ui-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrl: './sidenav-menu.component.scss',
  standalone: true,
  imports: [SidenavMenuElementComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder]
})
export class SidenavMenuComponent {
  public elements = injectRouteData<SidenavElement[]>('sidenavElements');

  public logoutClicked = output<void>();

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-sidenav-menu');
  }

  public onLogoutClick(): void {
    this.logoutClicked.emit();
  }
}
