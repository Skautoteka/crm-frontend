import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ButtonComponent, InputComponent, InputContainerComponent, InputViewService } from '@skautoteka-frontend/ui';
import { AsyncPipe } from '@angular/common';
import { Note } from '../../interfaces/note';
import { NotesStore } from '../../store/notes.store';

@Component({
  standalone: true,
  selector: 'skt-notes-create',
  styleUrl: './notes-create.component.scss',
  templateUrl: 'notes-create.component.html',
  providers: [ClassBinder, InputViewService],
  imports: [InputComponent, ButtonComponent, InputContainerComponent, AsyncPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesCreateComponent {
  public notesStore = inject(NotesStore);

  constructor(classBinder: ClassBinder, public inputView: InputViewService<Note>) {
    classBinder.bind('skt-notes-create');
    this.notesStore.fetchFields();
  }

  public onSaveButtonClick(): void {
    this.notesStore.addNote(this.inputView.value);
  }
}
