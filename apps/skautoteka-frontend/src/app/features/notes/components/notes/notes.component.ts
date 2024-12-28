import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  SideContentHeaderComponent,
  SideContentComponent,
  SideContentheaderActionsComponent,
  ButtonComponent,
  SideContentSectionComponent,
  SideContentSectionHeaderComponent,
  TableComponent,
  ContentComponent,
  ModalService
} from '@skautoteka-frontend/ui';
import { NotesBasicInfoComponent } from '../notes-basic-info/notes-basic-info.component';
import { NotesContentComponent } from '../notes-content/notes-content.component';
import { NotesCreateComponent } from '../notes-create/notes-create.component';
import { NotesStore } from '../../store/notes.store';

@Component({
  standalone: true,
  selector: 'skt-notes',
  styleUrl: './notes.component.scss',
  templateUrl: 'notes.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ContentComponent,
    SideContentHeaderComponent,
    SideContentheaderActionsComponent,
    SideContentComponent,
    SideContentSectionComponent,
    SideContentSectionHeaderComponent,
    ButtonComponent,
    TableComponent,
    NotesContentComponent,
    NotesBasicInfoComponent
  ]
})
export class NotesComponent {
  public notes = inject(NotesStore);

  constructor(classBinder: ClassBinder, private _modal: ModalService) {
    classBinder.bind('skt-notes');
  }

  public onAddNewClick(): void {
    this._modal.createModal(NotesCreateComponent, {
      header: 'Dodaj raport',
      subHeader: 'Wypełnij wszystkie wymagane informacje aby dodać raport'
    });
  }
}
