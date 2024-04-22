import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from "@angular/core";
import {ClassBinder} from "@skautoteka-frontend/common";
import {SidenavElement} from "../../interfaces";

@Component({
  selector: 'skt-ui-sidenav-menu-element',
  styleUrl: './sidenav-menu-element.component.scss',
  templateUrl: './sidenav-menu-element.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder]
})
export class SidenavMenuElementComponent {
  @Input({ required: true }) element: SidenavElement | null = null;

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-sidenav-menu-element')
  }
}
