import {
  ChangeDetectionStrategy,
  Component, Input,
  ViewEncapsulation,
} from '@angular/core';
import {ClassBinder} from "@skautoteka-frontend/common";
import {SidenavElement} from "../../interfaces";
import {NgFor} from "@angular/common";

@Component({
  selector: 'skt-ui-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrl: './sidenav-menu.component.scss',
  standalone: true,
  imports: [NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder]
})
export class SidenavMenuComponent {
  @Input() elements: SidenavElement[] = [];

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-sidenav-menu');
  }
}
