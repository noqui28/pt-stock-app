import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditInventaryComponent } from './add-edit-inventary.component';

describe('AddEditInventaryComponent', () => {
  let component: AddEditInventaryComponent;
  let fixture: ComponentFixture<AddEditInventaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditInventaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditInventaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
