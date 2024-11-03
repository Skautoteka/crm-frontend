import { Injectable } from '@angular/core';
import { NotificationContainerComponent } from '../components/notification-container/notification-container.component';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private _container: NotificationContainerComponent | null = null;

  public setContainer(container: NotificationContainerComponent): void {
    this._container = container;
  }

  public success(title: string, message?: string): void {
    if (this._container) {
      this._container.addNotification('success', title, message);
    }
  }

  public error(title: string, message?: string): void {
    if (this._container) {
      this._container.addNotification('failure', title, message);
    }
  }
}
