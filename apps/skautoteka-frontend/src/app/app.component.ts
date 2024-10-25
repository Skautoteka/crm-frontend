import { AfterViewInit, Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationsService, OverlayService } from '@skautoteka-frontend/ui';
import '@angular/common/locales/global/pl';
import { NotificationContainerComponent } from '@skautoteka-frontend/ui';

@Component({
  standalone: true,
  imports: [RouterModule, NotificationContainerComponent],
  selector: 'skt-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('overlayContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  constructor(private _overlay: OverlayService) {}

  private _notifications = inject(NotificationsService)

  ngAfterViewInit(): void {
    this._overlay.initializeContainer(this.container);

    this._notifications.success('Poprawnie zapisano rekord', 'asd')
    this._notifications.error('hello', 'asd')
  }
}
