import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedOffItemComponent } from './signed-off-item.component';

describe('SignedOffItemComponent', () => {
  let component: SignedOffItemComponent;
  let fixture: ComponentFixture<SignedOffItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignedOffItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignedOffItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
