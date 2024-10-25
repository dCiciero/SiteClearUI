import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigchangeReconciliationComponent } from './bigchange-reconciliation.component';

describe('BigchangeReconciliationComponent', () => {
  let component: BigchangeReconciliationComponent;
  let fixture: ComponentFixture<BigchangeReconciliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BigchangeReconciliationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigchangeReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
