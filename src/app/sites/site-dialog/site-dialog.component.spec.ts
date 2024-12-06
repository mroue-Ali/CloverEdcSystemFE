import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDialogComponent } from './site-dialog.component';

describe('UserDialogComponent', () => {
  let component: SiteDialogComponent;
  let fixture: ComponentFixture<SiteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SiteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
