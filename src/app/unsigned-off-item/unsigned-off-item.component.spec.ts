import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsignedOffItemComponent } from './unsigned-off-item.component';

describe('UnsignedOffItemComponent', () => {
  let component: UnsignedOffItemComponent;
  let fixture: ComponentFixture<UnsignedOffItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnsignedOffItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnsignedOffItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
