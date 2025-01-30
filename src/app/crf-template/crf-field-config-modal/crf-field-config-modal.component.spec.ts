import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrfFieldConfigModalComponent } from './crf-field-config-modal.component';

describe('CrfFieldConfigModalComponent', () => {
  let component: CrfFieldConfigModalComponent;
  let fixture: ComponentFixture<CrfFieldConfigModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrfFieldConfigModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrfFieldConfigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
