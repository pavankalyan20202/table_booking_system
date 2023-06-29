import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMgmtComponent } from './table-mgmt.component';

describe('TableMgmtComponent', () => {
  let component: TableMgmtComponent;
  let fixture: ComponentFixture<TableMgmtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableMgmtComponent]
    });
    fixture = TestBed.createComponent(TableMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
