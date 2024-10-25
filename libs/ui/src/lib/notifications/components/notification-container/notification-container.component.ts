import { ChangeDetectionStrategy, Component, ComponentRef, inject, viewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { ClassBinder } from "@skautoteka-frontend/common";
import { NotificationsService } from "../../services/notifications.service";
import { NotificationComponent } from "../notification/notification.component";

@Component({
  standalone: true,
  selector: 'skt-ui-notification-container',
  template: '<ng-container #container></ng-container>',
  styleUrl: 'notification-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder]
})
export class NotificationContainerComponent {
  private _classBinder = inject(ClassBinder);
  private _notifications = inject(NotificationsService)

  private _container = viewChild.required('container', { read: ViewContainerRef });

  constructor() {
    this._classBinder.bind('skt-ui-notification-container');
    this._notifications.setContainer(this);
  }

  public addNotification(type: 'success' | 'failure', title: string, message?: string): void {
    const ref = this._renderNotification();

    ref.setInput(type, type);
    ref.setInput(title, title);

    if(message) {
      ref.setInput('message', message)
    }
  }

  private _renderNotification(): ComponentRef<NotificationComponent> {
    const container = this._container();
    return container.createComponent(NotificationComponent)
  }
}
