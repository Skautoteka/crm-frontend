import { Component, ViewContainerRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './features/dashboard';
import { OverlayService } from '@skautoteka-frontend/ui';

@Component({
  standalone: true,
  imports: [RouterModule, DashboardComponent],
  selector: 'skt-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(_viewContainerRef: ViewContainerRef, _overlay: OverlayService) {
    _overlay.initializeContainer(_viewContainerRef);
  }
}
