import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ClassBinder } from '@skautoteka-frontend/common';
import { DialogService, ListCardComponent, ModalService } from '@skautoteka-frontend/ui';
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
  imports: [ListCardComponent, CommonModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksNotesComponent {
  public tasksStore = inject(TasksStore);
  public noteStore = inject(NotesStore);

  public assignedNotes = this.tasksStore.assignedNotes;

  private _dialog = inject(DialogService);

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

  public onTrashClicked(id: string): void {
    const ref = this._dialog.createPrompt({
      message: 'Czy na pewno chcesz usunąć rekord?',
      auxiliaryMessage: 'Usunięcie skutkuje całkowitym usunięciem danych',
      confirmInfo: {
        message: 'Tak, usuwam',
        callback: () => {
          this.noteStore.removeNote(id);
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
