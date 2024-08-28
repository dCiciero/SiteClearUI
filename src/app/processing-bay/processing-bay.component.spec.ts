import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingBayComponent } from './processing-bay.component';

describe('ProcessingBayComponent', () => {
  let component: ProcessingBayComponent;
  let fixture: ComponentFixture<ProcessingBayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessingBayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessingBayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
