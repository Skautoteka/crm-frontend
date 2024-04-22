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
  public navigationElements = [
    { label: 'Zadania', icon: 'test' },
    { label: 'Harmonogram', icon: 'test' },
    { label: 'Raporty', icon: 'test' },
    { label: 'Zawodnicy', icon: 'test' },
    { label: 'Drużyny', icon: 'test' },
    { label: 'Analiza', icon: 'test' },
    { label: 'Pomoc', icon: 'test' },
  ];
}
