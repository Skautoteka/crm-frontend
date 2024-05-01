import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { TabsService } from '../../services/tabs.service';

@Component({
  standalone: true,
  selector: 'skt-ui-tabs',
  styleUrl: './tabs.component.scss',
  templateUrl: 'tabs.component.html',
  providers: [ClassBinder, TabsService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren('elements')
  elements: any;

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-tabs');
  }

  ngAfterContentInit(): void {
    console.log(this.elements);
  }
}
