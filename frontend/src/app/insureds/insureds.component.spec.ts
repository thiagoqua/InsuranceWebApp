import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuredsComponent } from './insureds.component';

describe('InsuredsComponent', () => {
  let component: InsuredsComponent;
  let fixture: ComponentFixture<InsuredsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsuredsComponent]
    });
    fixture = TestBed.createComponent(InsuredsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
