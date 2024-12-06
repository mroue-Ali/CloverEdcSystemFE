import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiDialogComponent } from './pi-dialog.component';

describe('UserDialogComponent', () => {
  let component: PiDialogComponent;
  let fixture: ComponentFixture<PiDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PiDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
