import { ChangeDetectionStrategy, Component, effect, input, OnInit, signal, ViewEncapsulation } from '@angular/core';
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

  public iconColor = signal<string>('');

  constructor(private _classBinder: ClassBinder) {
    _classBinder.bind('skt-ui-icon-card');
    this._updateIconColor();
  }

  public ngOnInit(): void {
    this._classBinder.bind('skt-ui-icon-card--' + this.type());
  }

  private _updateIconColor(): void {
    effect(
      () => {
        const type = this.type();
        switch (type) {
          case 'simple':
            this.iconColor.set('var(--blue-dark)');
            break;
          case 'success':
            this.iconColor.set('var(--primary-5)');
            break;
          case 'warn':
            this.iconColor.set('var(--warn)');
        }
      },
      { allowSignalWrites: true }
    );
  }
}
