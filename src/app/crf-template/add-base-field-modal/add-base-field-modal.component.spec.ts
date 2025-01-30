import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBaseFieldModalComponent } from './add-base-field-modal.component';

describe('AddBaseFieldModalComponent', () => {
  let component: AddBaseFieldModalComponent;
  let fixture: ComponentFixture<AddBaseFieldModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBaseFieldModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBaseFieldModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
