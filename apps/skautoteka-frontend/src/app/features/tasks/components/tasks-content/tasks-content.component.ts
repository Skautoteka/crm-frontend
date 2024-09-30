import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder, DeviceService } from '@skautoteka-frontend/common';
import { LabelComponent, ListCardComponent, TabComponent, TabsComponent } from '@skautoteka-frontend/ui';
import { AsyncPipe } from '@angular/common';
import { TasksStore } from '../../store/tasks.store';

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
  public tasksStore = inject(TasksStore)

  constructor(classBinder: ClassBinder, public device: DeviceService) {
    classBinder.bind('skt-tasks-content');
  }

  public handleTabChange(id: string | null): void {
    console.log(id);
  }

  public handleTaskClick(id: string): void {
    this.tasksStore.setActiveTask(id);
  }
}
