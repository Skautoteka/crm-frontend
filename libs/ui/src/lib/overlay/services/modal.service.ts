import { ComponentRef, inject, Injectable } from '@angular/core';
import { OverlayService } from '@skautoteka-frontend/ui';
import { ComponentType } from '@angular/cdk/overlay';
import { ModalContainerComponent } from '../components/modal-container/modal-container.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private _refSet = new Set<ComponentRef<ModalContainerComponent<unknown>>>();
  private _overlay = inject(OverlayService);

  /**
   * Creates a modal that displays a component of a given type.
   *
   * @param type
   */
  public createModal(
    type: ComponentType<unknown>
  ): ComponentRef<ModalContainerComponent<unknown>> {
    const ref = this._overlay.createComponent(ModalContainerComponent);
    ref.setInput('componentType', type);
    this._refSet.add(ref);

    this._overlay.setBackdrop(true);
    return ref;
  }
}
