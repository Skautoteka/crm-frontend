import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { SidenavElement } from '../../interfaces';
import { NgFor } from '@angular/common';
import { SidenavMenuElementComponent } from '../sidenav-menu-element/sidenav-menu-element.component';
import { IconComponent } from '../../../icon';

@Component({
  selector: 'skt-ui-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrl: './sidenav-menu.component.scss',
  standalone: true,
  imports: [NgFor, SidenavMenuElementComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
})
export class SidenavMenuComponent {
  @Input() elements: SidenavElement[] = [];

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-sidenav-menu');
  }
}
