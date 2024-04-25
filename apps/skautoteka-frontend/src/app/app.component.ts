import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './features/dashboard';

@Component({
  standalone: true,
  imports: [RouterModule, DashboardComponent],
  selector: 'skt-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
