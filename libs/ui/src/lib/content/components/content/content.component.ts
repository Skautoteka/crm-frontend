import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ContentService } from '../../services';

@Component({
  selector: 'skt-ui-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder, ContentService],
  imports: [RouterOutlet, AsyncPipe],
})
export class ContentComponent {
  @Input() header = '';
  @Input() subHeader = '';

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-content');
  }
}
