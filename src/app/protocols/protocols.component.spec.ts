import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolsComponent } from './protocols.component';

describe('StudiesComponent', () => {
  let component: ProtocolsComponent;
  let fixture: ComponentFixture<ProtocolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProtocolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtocolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
