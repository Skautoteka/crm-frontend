import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ButtonComponent, InputComponent, InputContainerComponent, InputViewService } from '@skautoteka-frontend/ui';
import { AsyncPipe } from '@angular/common';
import { Note } from '../../interfaces/note';
import { NotesStore } from '../../store/notes.store';
import { TasksStore } from '../../../tasks/store/tasks.store';

@Component({
  standalone: true,
  selector: 'skt-notes-create-from-task',
  styleUrl: './notes-create-from-task.component.scss',
  templateUrl: 'notes-create-from-task.component.html',
  providers: [ClassBinder, InputViewService],
  imports: [InputComponent, ButtonComponent, InputContainerComponent, AsyncPipe],
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
    const taskId = this.tasksStore.activeTask()?.id;
    this.notesStore.addNote({ ...this.inputView.value, taskId });
    setTimeout(() => this.tasksStore.getAssignedNotes(taskId || ''), 100); // TODO how to get assigned notes on addition od note
  }
}
