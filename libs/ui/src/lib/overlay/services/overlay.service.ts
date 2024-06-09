import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay';
import { OverlayContainerComponent } from '../components/overlay-container/overlay-container.component';

@Injectable({ providedIn: 'root' })
export class OverlayService {
  private _viewRef: ViewContainerRef | null = null;
  private _containerRef: ComponentRef<OverlayContainerComponent> | null = null;

  /**
   * Initializes ovelray view container ref to be able to show modals
   * and othe components.
   *
   * @param ref
   */
  public initializeContainer(ref: ViewContainerRef): void {
    this._createContainer(ref);
  }

  /**
   * Creates a component and appends it to the view ref.
   *
   * @param type
   */
  public createComponent<T>(type: ComponentType<T>): ComponentRef<T> {
    if (!this._viewRef) {
      throw new Error('No viewRef provided');
    }

    return this._viewRef.createComponent(type);
  }

  /**
   * Toggles backdrop either to true/false.
   *
   * @param isVisible
   */
  public setBackdrop(isVisible: boolean): void {
    if (this._containerRef) {
      this._containerRef.instance.setBackdrop(isVisible);
    }
  }

  private _createContainer(ref: ViewContainerRef): void {
    this._containerRef = ref.createComponent(OverlayContainerComponent);
    this._viewRef = this._containerRef.instance.viewRef;
  }
}
