import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ListCardComponent,
  TabComponent,
  TabsComponent,
} from '@skautoteka-frontend/ui';
import { NgForOf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'skt-tasks-content',
  styleUrl: './tasks-content.component.scss',
  templateUrl: 'tasks-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TabsComponent, TabComponent, ListCardComponent, NgForOf],
})
export class TasksContentComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-tasks-content');
  }

  public handleTabChange(id: string | null): void {
    console.log(id);
  }
}
