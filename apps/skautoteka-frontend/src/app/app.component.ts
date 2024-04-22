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
    { label: 'Zadania', icon: 'move-task' },
    { label: 'Harmonogram', icon: 'calendar-today' },
    { label: 'Raporty', icon: 'file-document' },
    { label: 'Zawodnicy', icon: 'user' },
    { label: 'Drużyny', icon: 'organisation' },
    { label: 'Analiza', icon: 'chart' },
    { label: 'Pomoc', icon: 'info' },
  ];
}
