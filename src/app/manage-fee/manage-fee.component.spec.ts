import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeeComponent } from './manage-fee.component';

describe('ManageFeeComponent', () => {
  let component: ManageFeeComponent;
  let fixture: ComponentFixture<ManageFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
