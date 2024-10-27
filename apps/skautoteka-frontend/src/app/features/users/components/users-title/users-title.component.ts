import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ReportsStore } from '../../store/reports.store';

@Component({
  standalone: true,
  selector: 'skt-users-title',
  styleUrl: './users-title.component.scss',
  templateUrl: 'users-title.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTitleComponent {
  public reportsStore = inject(ReportsStore);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-users-title');
  }
}
