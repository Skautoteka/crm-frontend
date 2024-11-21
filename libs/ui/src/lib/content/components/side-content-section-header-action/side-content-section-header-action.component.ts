import { ChangeDetectionStrategy, Component, ViewEncapsulation, input, output } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { SimpleButtonComponent } from '../../../button';

@Component({
  standalone: true,
  selector: 'skt-ui-side-content-section-header-action',
  styleUrl: './side-content-section-header-action.component.scss',
  templateUrl: 'side-content-section-header-action.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SimpleButtonComponent]
})
export class SideContentSectionHeaderActionComponent {
  public title = input<string>('');
  public icon = input<string>('');
  public iconColor = input<string>('');
  public buttonText = input<string | null>(null);
  public actionClicked = output<void>();

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-side-content-section-header-action');
  }

  public onButtonClicked(): void {
    this.actionClicked.emit();
  }
}
