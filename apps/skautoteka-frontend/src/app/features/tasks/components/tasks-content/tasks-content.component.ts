import { DialogService, IconComponent } from '@skautoteka-frontend/ui';
import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { ClassBinder, DeviceService } from '@skautoteka-frontend/common';
import { LabelComponent, ListCardComponent, TabComponent, TabsComponent } from '@skautoteka-frontend/ui';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TasksStore } from '../../store/tasks.store';
import { TaskTypePipe } from '../../pipes/task-type.pipe';

@Component({
  standalone: true,
  selector: 'skt-tasks-content',
  styleUrl: './tasks-content.component.scss',
  templateUrl: 'tasks-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TabsComponent,
    IconComponent,
    DatePipe,
    TabComponent,
    TaskTypePipe,
    ListCardComponent,
    LabelComponent,
    AsyncPipe
  ]
})
export class TasksContentComponent {
  public tasksStore = inject(TasksStore);
  public tab = signal<string | null>(null);

  private _dialog = inject(DialogService);

  constructor(classBinder: ClassBinder, public device: DeviceService) {
    classBinder.bind('skt-tasks-content');
    this.tasksStore.getTasks();
  }

  public handleTaskClick(id: string): void {
    this.tasksStore.setActiveTask(id);
  }

  public handleTabChange(id: string | null): void {
    this.tasksStore.setActiveTask(null);
    this.tab.set(id);
  }

  public onTrashClicked(id: string): void {
    const ref = this._dialog.createPrompt({
      message: 'Czy na pewno chcesz usunąć rekord?',
      auxiliaryMessage: 'Usunięcie skutkuje całkowitym usunięciem danych',
      confirmInfo: {
        message: 'Tak, usuwam',
        callback: () => {
          this.tasksStore.removeTask(id);
          ref.close();
        }
      },
      cancelInfo: {
        message: 'Nie usuwaj',
        callback: () => ref.close()
      }
    });
  }
}
