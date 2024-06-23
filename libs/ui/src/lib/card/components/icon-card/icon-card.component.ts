import { ChangeDetectionStrategy, Component, input, OnInit, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { IconComponent } from '../../../icon';
import { IconCardType } from '../../interfaces';

@Component({
  standalone: true,
  selector: 'skt-ui-icon-card',
  styleUrl: './icon-card.component.scss',
  templateUrl: './icon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [IconComponent],
  providers: [ClassBinder]
})
export class IconCardComponent implements OnInit {
  public iconName = input<string>('');
  public type = input<IconCardType>('simple');

  constructor(private _classBinder: ClassBinder) {
    _classBinder.bind('skt-ui-icon-card');
  }

  public ngOnInit(): void {
    this._classBinder.bind('skt-ui-icon-card--' + this.type());
  }
}
