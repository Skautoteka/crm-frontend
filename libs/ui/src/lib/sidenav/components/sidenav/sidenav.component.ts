import {
  ChangeDetectionStrategy,
  Component, Input,
  ViewEncapsulation,
} from '@angular/core';
import {ClassBinder} from "@skautoteka-frontend/common";
import {SidenavMenuComponent} from "../sidenav-menu/sidenav-menu.component";
import {SidenavElement} from "../../interfaces";

@Component({
  selector: 'skt-ui-sidenav',
  styleUrl: './sidenav.component.scss',
  templateUrl: './sidenav.component.html',
  standalone: true,
  imports: [SidenavMenuComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder]
})
export class SidenavComponent {
  @Input({ required: true }) elements: SidenavElement[] = [];

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-sidenav');
  }
}
