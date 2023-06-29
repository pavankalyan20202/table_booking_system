import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifyReservationComponent } from './add-modify-reservation.component';

describe('AddModifyReservationComponent', () => {
  let component: AddModifyReservationComponent;
  let fixture: ComponentFixture<AddModifyReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddModifyReservationComponent]
    });
    fixture = TestBed.createComponent(AddModifyReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
