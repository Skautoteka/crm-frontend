import { ComponentRef, Injectable } from '@angular/core';
import { OverlayService } from './overlay.service';
import { PromptComponent } from '../components';
import { IPrompt, IPromptOptions } from '../interface/idialog';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private _overlay: OverlayService) {}

  /**
   * Creates a modal that displays a prompt.
   */
  public createPrompt(options: IPromptOptions): IPrompt {
    const ref = this._overlay.createComponent(PromptComponent);
    this._overlay.setBackdrop(true);
    ref.setInput('options', options);
    return this._createPromptRef(ref);
  }

  private _createPromptRef(ref: ComponentRef<PromptComponent>): IPrompt {
    return {
      close: () => {
        this._overlay.setBackdrop(false);
        ref.destroy();
      },
    };
  }
}
