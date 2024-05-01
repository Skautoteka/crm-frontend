import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Host,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { TabsService } from '../../services/tabs.service';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'skt-ui-tab',
  styleUrl: './tab.component.scss',
  templateUrl: 'tab.component.html',
  providers: [ClassBinder],
  imports: [AsyncPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  @Input({ required: true }) id!: string;

  constructor(
    @Host() private tabsService: TabsService,
    private elementRef: ElementRef,
    classBinder: ClassBinder
  ) {
    classBinder.bind('skt-ui-tab');
  }

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  get isActive$(): Observable<boolean> {
    return this.tabsService.activeId$.pipe(map((id) => id === this.id));
  }

  public handleClick(): void {
    this.tabsService.setActiveTab(this.id);
  }
}
