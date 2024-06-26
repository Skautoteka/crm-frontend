import { ChangeDetectionStrategy, Component, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  standalone: true,
  selector: 'skt-ui-overlay-container',
  styleUrl: './overlay-container.component.scss',
  templateUrl: 'overlay-container.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayContainerComponent {
  constructor(private _classBinder: ClassBinder, private _viewContainerRef: ViewContainerRef) {
    _classBinder.bind('skt-ui-overlay-container');
  }

  /**
   * View container ref of the overlay container.
   */
  get viewRef(): ViewContainerRef {
    return this._viewContainerRef;
  }

  /**
   * Toggles backdrop either to true/false.
   *
   * @param isVisible
   */
  public setBackdrop(isVisible: boolean): void {
    this._classBinder.conditionalBind(isVisible, 'skt-ui-overlay-container--backdrop');
  }
}
