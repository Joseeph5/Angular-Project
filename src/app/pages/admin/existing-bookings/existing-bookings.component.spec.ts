import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingBookingsComponent } from './existing-bookings.component';

describe('ExistingBookingsComponent', () => {
  let component: ExistingBookingsComponent;
  let fixture: ComponentFixture<ExistingBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExistingBookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
