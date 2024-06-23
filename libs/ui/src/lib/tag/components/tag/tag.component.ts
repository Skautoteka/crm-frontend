import { ChangeDetectionStrategy, Component, effect, input, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AsyncPipe } from '@angular/common';
import { TagType } from '../../interface';

@Component({
  standalone: true,
  selector: 'skt-ui-tag',
  styleUrl: './tag.component.scss',
  templateUrl: 'tag.component.html',
  providers: [ClassBinder],
  imports: [AsyncPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {
  public text = input<string>('');
  public type = input<TagType>('simple');

  constructor(private _classBinder: ClassBinder) {
    this._classBinder.bind('skt-ui-tag');
    this._setTypeClass();
  }

  private _setTypeClass(): void {
    effect(() => {
      const type = this.type();
      this._classBinder.bind('skt-ui-tag--' + type);
    });
  }
}
