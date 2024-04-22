import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {SidenavComponent} from "@skautoteka-frontend/ui";

@Component({
  standalone: true,
  imports: [RouterModule, SidenavComponent],
  selector: 'skt-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'skautoteka-frontend';
}
