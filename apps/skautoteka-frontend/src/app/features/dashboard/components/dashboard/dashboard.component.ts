import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { SidenavComponent, SidenavElement } from '@skautoteka-frontend/ui';
import { ClassBinder } from '@skautoteka-frontend/common';
import { DashboardUserComponent } from '../dashboard-user/dashboard-user.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'skt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [SidenavComponent, DashboardUserComponent, RouterModule],
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public elements: SidenavElement[] = [
    { label: 'Zadania', icon: 'move-task', route: 'tasks' },
    { label: 'Harmonogram', icon: 'calendar-today', route: 'calendar' },
    { label: 'Raporty', icon: 'file-document', route: 'reports' },
    { label: 'Zawodnicy', icon: 'user', route: 'players' },
    { label: 'Drużyny', icon: 'organisation', route: 'teams' },
    { label: 'Analiza', icon: 'chart', route: 'analysis' },
    { label: 'Pomoc', icon: 'info', route: 'help' },
  ];

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-dashboard');
  }
}
