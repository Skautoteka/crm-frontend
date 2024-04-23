import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { SidenavComponent } from '@skautoteka-frontend/ui';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  standalone: true,
  selector: 'skt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [SidenavComponent],
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public elements = [
    { label: 'Zadania', icon: 'move-task' },
    { label: 'Harmonogram', icon: 'calendar-today' },
    { label: 'Raporty', icon: 'file-document' },
    { label: 'Zawodnicy', icon: 'user' },
    { label: 'Drużyny', icon: 'organisation' },
    { label: 'Analiza', icon: 'chart' },
    { label: 'Pomoc', icon: 'info' },
  ];

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-dashboard');
  }
}
