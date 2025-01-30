import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsSidebarComponent } from './fields-sidebar.component';

describe('FieldsSidebarComponent', () => {
  let component: FieldsSidebarComponent;
  let fixture: ComponentFixture<FieldsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FieldsSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
