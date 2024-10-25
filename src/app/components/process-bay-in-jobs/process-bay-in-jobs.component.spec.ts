import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessBayInJobsComponent } from './process-bay-in-jobs.component';

describe('ProcessBayInJobsComponent', () => {
  let component: ProcessBayInJobsComponent;
  let fixture: ComponentFixture<ProcessBayInJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessBayInJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessBayInJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
