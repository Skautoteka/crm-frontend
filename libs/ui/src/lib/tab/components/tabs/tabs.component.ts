import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { TabsService } from '../../services/tabs.service';
import { TabComponent } from '../tab/tab.component';

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
  @ContentChildren(TabComponent) private tabs!: QueryList<TabComponent>;

  constructor(classBinder: ClassBinder, public tabsService: TabsService) {
    classBinder.bind('skt-ui-tabs');
  }

  ngAfterContentInit(): void {
    console.log(this.tabsService);
  }
}
