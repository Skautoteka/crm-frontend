import { ComponentRef, Injectable, InjectionToken, Injector, ViewContainerRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay';
import { OverlayContainerComponent } from '../components/overlay-container/overlay-container.component';

/**
 * Injection token used to inject custom data into overlay
 */
export const OVERLAY_DATA = new InjectionToken<any>('overlay.data');

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
  public createComponent<T>(type: ComponentType<T>, data?: any): ComponentRef<T> {
    if (!this._viewRef) {
      throw new Error('No viewRef provided');
    }

    if (data) {
      return this._viewRef.createComponent(type, {
        injector: Injector.create({
          providers: [{ provide: OVERLAY_DATA, useValue: data }]
        })
      });
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
