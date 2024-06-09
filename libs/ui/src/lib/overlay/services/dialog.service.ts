import { ComponentRef, Injectable } from '@angular/core';
import { OverlayService } from './overlay.service';
import { PromptComponent } from '../components';
import { IPromptOptions } from '../interface/idialog';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private _overlay: OverlayService) {}

  /**
   * Creates a modal that displays a prompt.
   */
  public createPrompt(options: IPromptOptions): ComponentRef<PromptComponent> {
    const ref = this._overlay.createComponent(PromptComponent);
    this._overlay.setBackdrop(true);
    return ref;
  }
}
