import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyDialogComponent } from './study-dialog.component';

describe('UserDialogComponent', () => {
  let component: StudyDialogComponent;
  let fixture: ComponentFixture<StudyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
