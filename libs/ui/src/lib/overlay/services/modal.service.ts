import { ComponentRef, inject, Injectable } from '@angular/core';
import { OverlayService } from '@skautoteka-frontend/ui';
import { ComponentType } from '@angular/cdk/overlay';
import { ModalContainerComponent } from '../components/modal-container/modal-container.component';
import { take } from 'rxjs';
import { IModalOptions } from '../interface/imodal';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private _refSet = new Set<ComponentRef<ModalContainerComponent<unknown>>>();
  private _overlay = inject(OverlayService);

  /**
   * Closes all modals.
   */
  public closeAll(): void {
    this._refSet.forEach((ref) => {
      ref.destroy();
      this._overlay.setBackdrop(false);
    });
  }

  /**
   * Creates a modal that displays a component of a given type.
   *
   * @param type
   * @param options
   */
  public createModal(
    type: ComponentType<unknown>,
    options?: IModalOptions
  ): ComponentRef<ModalContainerComponent<unknown>> {
    const ref = this._overlay.createComponent(ModalContainerComponent);
    ref.setInput('componentType', type);
    ref.setInput('options', options);
    this._handleModalClose(ref);
    this._refSet.add(ref);
    ref.changeDetectorRef.detectChanges();
    setTimeout(() => ref.changeDetectorRef.markForCheck(), 500);

    this._overlay.setBackdrop(true);
    return ref;
  }

  private _handleModalClose(
    ref: ComponentRef<ModalContainerComponent<unknown>>
  ): void {
    ref.instance.closeClick.pipe(take(1)).subscribe(() => {
      ref.destroy();
      this._overlay.setBackdrop(false);
    });
  }
}
