import { ChangeDetectionStrategy, Component, ViewEncapsulation, effect, input, output } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { IconComponent } from '../../../icon';

@Component({
  standalone: true,
  selector: 'skt-ui-list-card',
  styleUrl: './list-card.component.scss',
  templateUrl: './list-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
  imports: [IconComponent]
})
export class ListCardComponent {
  public assign = input<boolean>(false);
  public isActive = input<boolean>(false);

  public unassignClicked = output();
  public trashClicked = output();

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-list-card');

    effect(() => {
      classBinder.conditionalBind(this.isActive(), 'skt-ui-list-card--active');
    });
  }

  public onTrashClicked(): void {
    this.trashClicked.emit();
  }

  public onAssignedClick(): void {
    this.unassignClicked.emit();
  }
}
