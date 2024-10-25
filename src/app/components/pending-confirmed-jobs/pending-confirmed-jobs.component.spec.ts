import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingConfirmedJobsComponent } from './pending-confirmed-jobs.component';

describe('PendingConfirmedJobsComponent', () => {
  let component: PendingConfirmedJobsComponent;
  let fixture: ComponentFixture<PendingConfirmedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PendingConfirmedJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingConfirmedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
