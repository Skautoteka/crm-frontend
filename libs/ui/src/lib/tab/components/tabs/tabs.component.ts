import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  DestroyRef,
  ElementRef,
  inject,
  QueryList,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { TabsService } from '../../services/tabs.service';
import { TabComponent } from '../tab/tab.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'skt-ui-tabs',
  styleUrl: './tabs.component.scss',
  templateUrl: 'tabs.component.html',
  providers: [ClassBinder, TabsService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements AfterViewInit {
  @ContentChildren(TabComponent) private tabs!: QueryList<TabComponent>;
  @ViewChild('slider') slider!: ElementRef;

  private destroyRef = inject(DestroyRef);

  constructor(
    classBinder: ClassBinder,
    public tabsService: TabsService,
    private renderer: Renderer2
  ) {
    classBinder.bind('skt-ui-tabs');
  }

  ngAfterViewInit(): void {
    this.updateSlider();
  }

  private updateSlider(): void {
    this.tabsService.activeId$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id) => {
        if (!id) {
          this.hideSlider();
          return;
        }

        const activeTab = this.findTabById(id);
        if (activeTab) {
          this.updateSliderPosition(activeTab);
        }
      });
  }

  private findTabById(id: string): TabComponent | null {
    return this.tabs.find((tab) => tab.id === id) || null;
  }

  private updateSliderPosition(tab: TabComponent): void {
    const sliderEl = this.slider.nativeElement;
    const tabEl = tab.nativeElement;

    const { width } = tabEl.getBoundingClientRect();

    this.renderer.setStyle(sliderEl, 'opacity', '1');
    this.renderer.setStyle(sliderEl, 'width', width + 'px');
    this.renderer.setStyle(sliderEl, 'left', tabEl.offsetLeft + 'px');
  }

  private hideSlider(): void {
    const sliderEl = this.slider.nativeElement;
    this.renderer.setStyle(sliderEl, 'opacity', '0');
    this.renderer.setStyle(sliderEl, 'width', '0');
  }
}
