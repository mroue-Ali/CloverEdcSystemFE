import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrcsComponent } from './crcs.component';

describe('CrcsComponent', () => {
  let component: CrcsComponent;
  let fixture: ComponentFixture<CrcsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrcsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
