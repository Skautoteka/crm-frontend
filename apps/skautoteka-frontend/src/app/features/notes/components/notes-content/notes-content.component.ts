import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  LabelComponent,
  ListCardComponent,
  TabComponent,
  TabsComponent,
  TableComponent,
  TableRowCellComponent,
  TableRowComponent,
  TagComponent
} from '@skautoteka-frontend/ui';
import { DatePipe } from '@angular/common';
import { StatusTextPipe } from '../../pipes';
import { NotesStore } from '../../store/notes.store';

@Component({
  standalone: true,
  selector: 'skt-notes-content',
  styleUrl: './notes-content.component.scss',
  templateUrl: 'notes-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TabsComponent,
    TabComponent,
    ListCardComponent,
    LabelComponent,
    TableComponent,
    TableRowCellComponent,
    TableRowComponent,
    TagComponent,
    DatePipe,
    StatusTextPipe
  ]
})
export class NotesContentComponent {
  public notesStore = inject(NotesStore);
  public tableDef = [
    { name: 'Zdjecie', width: '4rem', hidden: true },
    { name: 'Nazwa', width: 'auto' },
    { name: 'Status', width: '7.5rem' },
    { name: 'Data utworzenia', width: '25%' }
  ];

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-notes-content');
    this.notesStore.getNotes();
  }

  public onRowClicked(id: string): void {
    this.notesStore.setActiveNote(id);
  }
}
