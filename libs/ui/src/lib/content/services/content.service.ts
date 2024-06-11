import { Injectable } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Injectable()
export class ContentService {
  constructor(private _classBinder: ClassBinder) {}

  /**
   * A method that is called in order to show side content.
   *
   * @param isVisible
   */
  public showSideContent(isVisible: boolean): void {
    this._classBinder.conditionalBind(isVisible, 'skt-ui-content--visible');
  }
}
