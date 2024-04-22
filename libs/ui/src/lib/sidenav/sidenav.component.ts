import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClassBinder} from "@skautoteka-frontend/common";

@Component({
  selector: 'skt-ui-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder]
})
export class SidenavComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-sidenav');
  }
}
