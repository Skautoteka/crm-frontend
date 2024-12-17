import { ChangeDetectionStrategy, Component, effect, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ActionsConfig,
  ContentService,
  SideContentComponent,
  SideContentheaderActionsComponent,
  SideContentHeaderComponent,
  SideContentSectionComponent,
  SideContentSectionHeaderComponent,
  SideContentSectionHeaderActionComponent
} from '@skautoteka-frontend/ui';
import { NotesBasicInfoComponent } from '../notes-basic-info/notes-basic-info.component';
import { NotesTitleComponent } from '../notes-title/notes-title.component';
import { NotesRatingComponent } from '../notes-rating/notes-rating.component';
import { NotesStore } from '../../store/notes.store';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'skt-notes-side-content',
  styleUrl: './notes-side-content.component.scss',
  templateUrl: 'notes-side-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SideContentComponent,
    SideContentSectionHeaderComponent,
    SideContentSectionComponent,
    NotesBasicInfoComponent,
    SideContentHeaderComponent,
    SideContentheaderActionsComponent,
    NotesTitleComponent,
    NotesRatingComponent,
    SideContentSectionHeaderActionComponent
  ]
})
export class NotesSideContentComponent {
  public notesStore = inject(NotesStore);
  public actionsConfig: ActionsConfig[] = [
    {
      type: 'DELETE',
      text: 'Usuń raport',
      callback: () => this._deleteNote()
    }
  ];

  private _router = inject(Router);

  constructor(classBinder: ClassBinder, private _content: ContentService) {
    classBinder.bind('skt-notes-side-content');
    this._showSideContent();

    if (!this.notesStore.activeNote()) {
      this._router.navigate(['/', 'dashboard', 'notes']);
    }
  }

  public onMobileBackClick(): void {
    this.notesStore.setActiveNote(null);
  }

  private _showSideContent() {
    effect(() => {
      const activeNote = this.notesStore.activeNote();
      if (activeNote) {
        this._content.showSideContent(!!activeNote);
      }
    });
  }

  private _deleteNote(): void {
    const activeNote = this.notesStore.activeNote();

    if (!activeNote) {
      return;
    }

    this.notesStore.removeNote(activeNote.id);
  }
}
