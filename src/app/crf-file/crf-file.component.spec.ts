import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrfFileComponent } from './crf-file.component';

describe('CrfFileComponent', () => {
  let component: CrfFileComponent;
  let fixture: ComponentFixture<CrfFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrfFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrfFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
