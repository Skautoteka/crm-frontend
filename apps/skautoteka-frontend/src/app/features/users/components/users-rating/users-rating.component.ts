import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AsyncPipe } from '@angular/common';
import { IconCardComponent } from '@skautoteka-frontend/ui';

@Component({
  standalone: true,
  selector: 'skt-users-rating',
  styleUrl: './users-rating.component.scss',
  templateUrl: 'users-rating.component.html',
  providers: [ClassBinder],
  imports: [AsyncPipe, IconCardComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersRatingComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-users-rating');
  }
}
