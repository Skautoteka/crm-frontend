import { ChangeDetectionStrategy, Component, effect, input, Input, ViewEncapsulation } from '@angular/core';
import { ClassBinder, DeviceService } from '@skautoteka-frontend/common';
import { RouterOutlet } from '@angular/router';
import { ContentService } from '../../services';

@Component({
  selector: 'skt-ui-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder, ContentService],
  imports: [RouterOutlet]
})
export class ContentComponent {
  @Input() header = '';
  @Input() subHeader = '';

  public showSide = input(true);

  constructor(classBinder: ClassBinder, public device: DeviceService) {
    classBinder.bind('skt-ui-content');

    effect(() => {
      classBinder.conditionalBind(!this.showSide(), 'skt-ui-content--no-side')
    })
  }
}
