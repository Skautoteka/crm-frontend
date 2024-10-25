import { ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from "@angular/core";
import { ClassBinder } from "@skautoteka-frontend/common";

@Component({
  standalone: true,
  selector: 'skt-ui-notification',
  templateUrl: 'notification.component.html',
  styleUrl: 'notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder]
})
export class NotificationComponent {
  public type = input.required<'success' | 'failure'>();
  public title = input.required<string>();
  public message = input<string>();

  private _classBinder = inject(ClassBinder);

  constructor() {
    this._classBinder.bind('skt-ui-notification');
  }
}
