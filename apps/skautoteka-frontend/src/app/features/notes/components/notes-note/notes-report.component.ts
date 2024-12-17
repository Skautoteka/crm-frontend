import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject, effect } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { CommonModule } from '@angular/common';
import {
  IconCardComponent,
  LabelComponent,
  LabelContainerComponent,
  ButtonComponent,
  InputComponent,
  InputContainerComponent
} from '@skautoteka-frontend/ui';
import { AuthStore } from '../../../auth/store/auth.store';
import { NotesStore } from '../../store/notes.store';

@Component({
  standalone: true,
  selector: 'skt-notes-note',
  styleUrl: './notes-note.component.scss',
  templateUrl: 'notes-note.component.html',
  providers: [ClassBinder],
  imports: [
    IconCardComponent,
    LabelComponent,
    LabelContainerComponent,
    InputComponent,
    ButtonComponent,
    InputContainerComponent,
    CommonModule
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesNoteComponent {
  public authStore = inject(AuthStore);
  public noteStore = inject(NotesStore);

  public selectedNote = this.noteStore.selectedNote;

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-notes-note');

    effect(() => {
      console.log('Selected Note changed:', this.selectedNote());
    });
  }
}
