import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AsyncPipe } from '@angular/common';
import { IconCardComponent } from '@skautoteka-frontend/ui';

@Component({
  standalone: true,
  selector: 'skt-note-rating',
  styleUrl: './notes-rating.component.scss',
  templateUrl: 'notes-rating.component.html',
  providers: [ClassBinder],
  imports: [AsyncPipe, IconCardComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesRatingComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-notes-rating');
  }
}
