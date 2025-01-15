import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ButtonComponent, InputContainerComponent, InputViewService } from '@skautoteka-frontend/ui';
import { Note } from '../../interfaces/note';
import { NotesStore } from '../../store/notes.store';
import { TasksStore } from '../../../tasks/store/tasks.store';

@Component({
  standalone: true,
  selector: 'skt-notes-create-from-task',
  styleUrl: './notes-create-from-task.component.scss',
  templateUrl: 'notes-create-from-task.component.html',
  providers: [ClassBinder, InputViewService],
  imports: [ButtonComponent, InputContainerComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesCreateFromTaskComponent {
  public notesStore = inject(NotesStore);
  public tasksStore = inject(TasksStore);

  constructor(classBinder: ClassBinder, public inputView: InputViewService<Note>) {
    classBinder.bind('skt-notes-create-from-task');
    this.notesStore.fetchFields();
  }

  public onSaveButtonClick(): void {
    const activeTask = this.tasksStore.activeTask();

    if (!activeTask) {
      return;
    }

    this.notesStore.addNote({ ...this.inputView.value, taskId: activeTask.id });
  }
}
