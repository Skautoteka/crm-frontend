import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  Input,
  output,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { NgClass } from '@angular/common';

@Component({
  selector: 'skt-ui-icon',
  styleUrl: './icon.component.scss',
  templateUrl: './icon.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [NgClass],
  providers: [ClassBinder]
})
export class IconComponent {
  @ViewChild('iconWrapper', { read: ElementRef }) iconWrapper!: ElementRef;

  @Input({ required: true }) iconName = '';
  public iconColor = input<string>('');
  public iconAction = output<void>();

  constructor(classBinder: ClassBinder, private _renderer: Renderer2) {
    classBinder.bind('skt-ui-icon');

    effect(() => {
      const color = this.iconColor();
      this._renderer.setStyle(this.iconWrapper.nativeElement, 'color', color);
    });
  }

  public iconOnClick() {
    this.iconAction.emit();
  }
}
