import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export const getElementByTestId = <T>(fixture: ComponentFixture<T>, id: string): DebugElement => {
  return fixture.debugElement.query(By.css(`[data-testid="${id}"`));
};
