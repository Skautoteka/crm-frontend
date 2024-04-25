import { DebugElement } from '@angular/core';

export const hasClass = (element: DebugElement, className: string): boolean =>
  element.nativeElement.classList.contains(className);
