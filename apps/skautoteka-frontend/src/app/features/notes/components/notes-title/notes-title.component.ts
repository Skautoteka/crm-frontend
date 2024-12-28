import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { NotesStore } from '../../store/notes.store';

@Component({
  standalone: true,
  selector: 'skt-note-title',
  styleUrl: './notes-title.component.scss',
  templateUrl: 'notes-title.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesTitleComponent {
  public notesStore = inject(NotesStore);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-note-title');
  }
}
