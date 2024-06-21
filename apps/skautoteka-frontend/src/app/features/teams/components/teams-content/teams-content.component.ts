import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { TableComponent } from '@skautoteka-frontend/ui';

@Component({
  standalone: true,
  selector: 'skt-teams-content',
  styleUrl: './teams-content.component.scss',
  templateUrl: 'teams-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableComponent]
})
export class TeamsContentComponent {
  public tableDef = [
    { name: 'Nazwa', width: '10%' },
    { name: 'Liga', width: '20%' },
    { name: 'Kraj', width: '30%' },
    { name: 'Miasto', width: '40%' }
  ]

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-teams-content');
  }
}
