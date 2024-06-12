import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  LabelComponent,
  ListCardComponent,
  TabComponent,
  TabsComponent,
} from '@skautoteka-frontend/ui';
import { TasksService } from '../../services';


@Component({
  standalone: true,
  selector: 'skt-tasks-content',
  styleUrl: './tasks-content.component.scss',
  templateUrl: 'tasks-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TabsComponent, TabComponent, ListCardComponent, LabelComponent],
})
export class TasksContentComponent {
  constructor(classBinder: ClassBinder, public tasksService: TasksService) {
    classBinder.bind('skt-tasks-content');
  }

  public handleTabChange(id: string | null): void {
    console.log(id);
  }

  public handleTaskClick(id: number): void {
    this.tasksService.setActiveTask(id);
  }

  public isActive(id: number): boolean {
    return id === this.tasksService.activeTask?.id;
  }
}
