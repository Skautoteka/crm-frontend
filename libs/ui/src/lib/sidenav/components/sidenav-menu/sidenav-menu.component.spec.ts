import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavMenuComponent } from './sidenav-menu.component';

describe('SidenavMenuComponent', () => {
  let fixture: ComponentFixture<SidenavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavMenuComponent);
  });

  it('successfully initializes', () => {
    expect(fixture).toBeTruthy();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
