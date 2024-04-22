import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavComponent } from './sidenav.component';
import {hasClass} from "@skautoteka-frontend/test-utils";

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('successfully creates', () => {
    expect(component).toBeTruthy();
  });

  it('binds correct class', () => {
    expect(hasClass(fixture.debugElement, 'skt-ui-sidenav')).toBeTruthy();
  })
});
