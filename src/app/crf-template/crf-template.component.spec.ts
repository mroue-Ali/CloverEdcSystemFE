import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrfTemplateComponent } from './crf-template.component';

describe('CrfTemplateComponent', () => {
  let component: CrfTemplateComponent;
  let fixture: ComponentFixture<CrfTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrfTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrfTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
