import { ChangeDetectionStrategy, Component, ViewEncapsulation, Input } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { DatePipe } from '@angular/common';
import { LabelComponent, ListCardComponent, TabComponent, TabsComponent } from '@skautoteka-frontend/ui';

@Component({
  standalone: true,
  selector: 'skt-reports-basic-info',
  styleUrl: './reports-basic-info.component.scss',
  templateUrl: 'reports-basic-info.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TabsComponent, TabComponent, ListCardComponent, LabelComponent, DatePipe]
})
export class ReportsBasicInfoComponent {
  @Input() date: Date = new Date();
  @Input() rating = 0;
  @Input() finished = false;
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-reports-basic-info');
  }
}
