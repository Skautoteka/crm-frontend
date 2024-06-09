import { ComponentRef, inject, Injectable } from '@angular/core';
import { OverlayService } from '@skautoteka-frontend/ui';
import { ComponentType } from '@angular/cdk/overlay';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private _refSet = new Set<ComponentRef<unknown>>();
  private _overlay = inject(OverlayService);

  /**
   * Creates a modal that displays a component of a given type.
   *
   * @param type
   */
  public createModal<T>(type: ComponentType<T>): ComponentRef<T> {
    const ref = this._overlay.createComponent(type);
    this._refSet.add(ref);

    return ref;
  }
}
