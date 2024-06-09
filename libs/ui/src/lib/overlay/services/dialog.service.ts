import { ComponentRef, Injectable } from '@angular/core';
import { OverlayService } from './overlay.service';
import { DialogComponent } from '../components';
import { DialogType } from '../interface/idialog';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private _overlay: OverlayService) {}

  /**
   * Creates a modal that displays a component of a given type.
   *
   * @param type
   */
  public createDialog(type: DialogType): ComponentRef<DialogComponent> {
    const ref = this._overlay.createComponent(DialogComponent);
    ref.setInput('type', type);
    this._overlay.setBackdrop(true);
    return ref;
  }
}
