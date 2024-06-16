import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
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
export class AppComponent implements AfterViewInit {
  @ViewChild('overlayContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  constructor(private _overlay: OverlayService) {}

  ngAfterViewInit(): void {
    this._overlay.initializeContainer(this.container);
  }
}
