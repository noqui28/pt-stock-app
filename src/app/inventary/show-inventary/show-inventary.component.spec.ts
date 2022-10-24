import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInventaryComponent } from './show-inventary.component';

describe('ShowInventaryComponent', () => {
  let component: ShowInventaryComponent;
  let fixture: ComponentFixture<ShowInventaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowInventaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInventaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
