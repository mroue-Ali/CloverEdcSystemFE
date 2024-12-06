import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolDialogComponent } from './protocol-dialog.component';

describe('UserDialogComponent', () => {
  let component: ProtocolDialogComponent;
  let fixture: ComponentFixture<ProtocolDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProtocolDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtocolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
