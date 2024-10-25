import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessBayOutJobsComponent } from './process-bay-out-jobs.component';

describe('ProcessBayOutJobsComponent', () => {
  let component: ProcessBayOutJobsComponent;
  let fixture: ComponentFixture<ProcessBayOutJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessBayOutJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessBayOutJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
