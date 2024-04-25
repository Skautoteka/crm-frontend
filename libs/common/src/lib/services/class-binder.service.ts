import { ElementRef, Injectable } from '@angular/core';

@Injectable()
export class ClassBinder {
  constructor(private elementRef: ElementRef) {}

  public bind(className: string): void {
    this.elementRef.nativeElement.classList.add(className);
  }
}
