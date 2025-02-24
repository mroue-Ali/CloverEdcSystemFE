import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrfComponent } from './crf.component';

describe('CrfComponent', () => {
  let component: CrfComponent;
  let fixture: ComponentFixture<CrfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
