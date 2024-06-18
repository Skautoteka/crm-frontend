import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavMenuElementComponent } from '../sidenav-menu-element/sidenav-menu-element.component';

describe('SidenavMenuElement', () => {
  let fixture: ComponentFixture<SidenavMenuElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SidenavMenuElementComponent]
    });

    fixture = TestBed.createComponent(SidenavMenuElementComponent);
  });

  it('successfully initializes', () => {
    expect(fixture).toBeTruthy();
  });
});
