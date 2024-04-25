import { Component } from '@angular/core';
import { ClassBinder } from './class-binder.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  selector: 'common-test-component',
  providers: [ClassBinder],
  standalone: true,
})
class TestComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('test-class');
  }
}

describe('ClassBinder', () => {
  let fixture: ComponentFixture<TestComponent>;
  let service: ClassBinder;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    service = fixture.componentRef.injector.get(ClassBinder);
  });

  it('successfully initializes service', () => {
    expect(service).toBeTruthy();
  });

  it('adds class name to the host element', () => {
    expect(fixture.nativeElement.classList.contains('test-class')).toBeTruthy();
  });
});
