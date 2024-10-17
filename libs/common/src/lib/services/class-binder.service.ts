import { ElementRef, Injectable } from '@angular/core';

@Injectable()
export class ClassBinder {
  constructor(private elementRef: ElementRef) {}

  public bind(className: string): void {
    this.elementRef.nativeElement.classList.add(className);
  }

  public unbind(className: string): void {
    this.elementRef.nativeElement.classList.remove(className);
  }

  public conditionalBind(condition: boolean, className: string): void {
    condition
      ? this.elementRef.nativeElement.classList.add(className)
      : this.elementRef.nativeElement.classList.remove(className);
  }
}
