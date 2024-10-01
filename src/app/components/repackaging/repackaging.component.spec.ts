import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepackagingComponent } from './repackaging.component';

describe('RepackagingComponent', () => {
  let component: RepackagingComponent;
  let fixture: ComponentFixture<RepackagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepackagingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepackagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
