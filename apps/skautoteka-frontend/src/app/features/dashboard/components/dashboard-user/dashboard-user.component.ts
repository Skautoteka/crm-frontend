import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  standalone: true,
  selector: 'skt-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.scss',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardUserComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-dashboard-user');
  }
}
