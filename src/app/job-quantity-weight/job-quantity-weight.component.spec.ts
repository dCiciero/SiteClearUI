import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobQuantityWeightComponent } from './job-quantity-weight.component';

describe('JobQuantityWeightComponent', () => {
  let component: JobQuantityWeightComponent;
  let fixture: ComponentFixture<JobQuantityWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobQuantityWeightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobQuantityWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
