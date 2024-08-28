import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWeightDetailsComponent } from './view-weight-details.component';

describe('ViewWeightDetailsComponent', () => {
  let component: ViewWeightDetailsComponent;
  let fixture: ComponentFixture<ViewWeightDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewWeightDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewWeightDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
