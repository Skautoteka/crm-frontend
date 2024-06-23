import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder, DeviceService } from '@skautoteka-frontend/common';
import { LabelComponent, ListCardComponent, TabComponent, TabsComponent } from '@skautoteka-frontend/ui';
import { TasksService } from '../../services';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'skt-tasks-content',
  styleUrl: './tasks-content.component.scss',
  templateUrl: 'tasks-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TabsComponent, TabComponent, ListCardComponent, LabelComponent, AsyncPipe]
})
export class TasksContentComponent {
  constructor(classBinder: ClassBinder, public tasksService: TasksService, public device: DeviceService) {
    classBinder.bind('skt-tasks-content');
  }

  public handleTabChange(id: string | null): void {}

  public handleTaskClick(id: number): void {
    this.tasksService.setActiveTask(id);
  }
}
