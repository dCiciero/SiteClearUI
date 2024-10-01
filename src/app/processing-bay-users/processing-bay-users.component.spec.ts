import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingBayUsersComponent } from './processing-bay-users.component';

describe('ProcessingBayUsersComponent', () => {
  let component: ProcessingBayUsersComponent;
  let fixture: ComponentFixture<ProcessingBayUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessingBayUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessingBayUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
