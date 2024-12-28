import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ButtonComponent, InputComponent, InputContainerComponent, InputViewService } from '@skautoteka-frontend/ui';
import { AsyncPipe } from '@angular/common';
import { Note } from '../../interfaces/note';
import { NotesStore } from '../../store/notes.store';
import { TasksStore } from '../../../tasks/store/tasks.store';

@Component({
  standalone: true,
  selector: 'skt-tasks-create-full',
  styleUrl: './notes-create-full.component.scss',
  templateUrl: 'notes-create-full.component.html',
  providers: [ClassBinder, InputViewService],
  imports: [InputComponent, ButtonComponent, InputContainerComponent, AsyncPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesCreateFullComponent {
  public notesStore = inject(NotesStore);
  public tasksStore = inject(TasksStore);

  constructor(classBinder: ClassBinder, public inputView: InputViewService<Note>) {
    classBinder.bind('skt-tasks-create-full');
    this.notesStore.fetchNoteFields(this.notesStore.selectedNote()?.id || '');
  }

  public onSaveButtonClick(): void {
    this.notesStore.updateNote({ ...this.inputView.value, id: this.notesStore.selectedNote()?.id || '' });
  }
}
