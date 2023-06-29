import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifyTableComponent } from './add-modify-table.component';

describe('AddModifyTableComponent', () => {
  let component: AddModifyTableComponent;
  let fixture: ComponentFixture<AddModifyTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddModifyTableComponent]
    });
    fixture = TestBed.createComponent(AddModifyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
