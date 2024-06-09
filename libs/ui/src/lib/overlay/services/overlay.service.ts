import { Injectable, ViewContainerRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay';

@Injectable({ providedIn: 'root' })
export class OverlayService {
  private _viewRef: ViewContainerRef | null = null;

  /**
   * Initializes ovelray view container ref to be able to show modals
   * and othe components.
   *
   * @param ref
   */
  public initializeContainer(ref: ViewContainerRef): void {
    this._viewRef = ref;
  }

  /**
   * Creates a component and appends it to the view ref.
   *
   * @param type
   */
  public createComponent(type: ComponentType<unknown>): void {
    if (!this._viewRef) {
      throw new Error('No viewRef provided');
    }

    this._viewRef.createComponent(type);
  }
}
