import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ClassBinder } from '@skautoteka-frontend/common';
import { LabelComponent, LabelContainerComponent, ListCardComponent, ModalService } from '@skautoteka-frontend/ui';
import { TasksStore } from '../../store/tasks.store';
import { Note } from '../../../notes/interfaces/note';
import { NotesStore } from '../../../notes/store/notes.store';
import { NotesCreateFullComponent } from '../../../notes/components/notes-create-full/notes-create-full.component';

@Component({
  standalone: true,
  selector: 'skt-tasks-notes',
  styleUrl: './tasks-notes.component.scss',
  templateUrl: 'tasks-notes.component.html',
  providers: [ClassBinder, DatePipe],
  imports: [
    LabelComponent,
    LabelContainerComponent,
    ListCardComponent,
    CommonModule,
    DatePipe,
    NotesCreateFullComponent
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksNotesComponent {
  public tasksStore = inject(TasksStore);
  public noteStore = inject(NotesStore);

  public assignedNotes = this.tasksStore.assignedNotes;

  constructor(classBinder: ClassBinder, private _modal: ModalService, private datePipe: DatePipe) {
    classBinder.bind('skt-tasks-notes');
  }

  public openNote(note: Note): void {
    const formattedDate = this.datePipe.transform(note.createdAt, 'dd-MM-yyyy');
    this.noteStore.setSelectedNote(note);

    this._modal.createModal(NotesCreateFullComponent, {
      header: `Notatka: ${note.name}`,
      subHeader: `Utworzona: ${formattedDate}`
    });
  }
}
