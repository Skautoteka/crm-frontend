import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { ClassBinder } from "@skautoteka-frontend/common";

@Component({
  standalone: true,
  selector: 'skt-ui-card',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder]
})
export class CardComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-card');
  }
}
