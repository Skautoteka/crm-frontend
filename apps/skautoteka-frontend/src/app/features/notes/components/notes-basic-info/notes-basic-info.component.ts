import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AsyncPipe, DatePipe } from '@angular/common';
import {
  LabelComponent,
  LabelContainerComponent,
  ListCardComponent,
  TabComponent,
  TabsComponent,
  TagComponent
} from '@skautoteka-frontend/ui';
import { StatusTextPipe } from '../../pipes';
import { NotesStore } from '../../store/notes.store';

@Component({
  standalone: true,
  selector: 'skt-notes-basic-info',
  styleUrl: './notes-basic-info.component.scss',
  templateUrl: 'notes-basic-info.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TabsComponent,
    TabComponent,
    ListCardComponent,
    LabelComponent,
    DatePipe,
    AsyncPipe,
    LabelContainerComponent,
    TagComponent,
    StatusTextPipe
  ]
})
export class NotesBasicInfoComponent {
  public notesStore = inject(NotesStore);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-notes-basic-info');
  }
}
