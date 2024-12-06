import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrcDialogComponent } from './crc-dialog.component';

describe('UserDialogComponent', () => {
  let component: CrcDialogComponent;
  let fixture: ComponentFixture<CrcDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrcDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrcDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
