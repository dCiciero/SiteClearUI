import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutbayComponent } from './outbay.component';

describe('OutbayComponent', () => {
  let component: OutbayComponent;
  let fixture: ComponentFixture<OutbayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutbayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutbayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
