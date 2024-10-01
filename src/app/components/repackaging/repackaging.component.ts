import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-repackaging',
  templateUrl: './repackaging.component.html',
  styleUrl: './repackaging.component.scss'
})
export class RepackagingComponent implements OnInit {
  @Input() financialItem: any;
  isLoading = false;
  repackageForm: any;
  containerTypes: any[]=[];
  disablePercentageControl: boolean = true;

  constructor(private apiService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.repackageForm = this.fb.group({
      totalQty: [0],
      availableQty: [0],
      containerId: [''],
      unit: [''],
      percentageValue: [0],
      financialLineId: [''],
    });

    this.getContainerTypes();
    console.log(this.financialItem);
    this.TotalQty.setValue(this.financialItem.totalWeight);
    this.FinancialLineId.setValue(this.financialItem.id);
    
  }

  getContainerTypes() {
    this.apiService.getContainerTypes().subscribe(
      (resData: any) => {
        if (resData.isSuccess == true) {
          this.containerTypes = resData.result;
        }
      },
      (error) => {
        console.log("Error getting container types")
      }
    );
  }

  getSelectedContainer() {
    console.log(this.repackageForm.value);    
  }

  get TotalQty() {
    return this.repackageForm.get('totalQty');
  }

  get AvailableQty() {
    return this.repackageForm.get('availableQty');
  }

  get PercentageValue() {
    return this.repackageForm.get('percentageValue');
  }
  get FinancialLineId() {
    return this.repackageForm.get('financialLineId');
  }

  get UnitValue() {
    return this.repackageForm.get('unit');
  }

  calculatePercentage() {
    const PERCENTAGE = 100;
    let totalQty = this.TotalQty.value;
    let unitValue = this.UnitValue.value
    // let percentageValue = this.PercentageValue.value;
    let calculatedPercentage = (unitValue/totalQty) * PERCENTAGE;
    console.log(calculatedPercentage);
    console.log(calculatedPercentage.toFixed(2));
    this.PercentageValue.value = calculatedPercentage.toFixed(2);
    this.PercentageValue.setValue(calculatedPercentage.toFixed(2));
    this.AvailableQty.setValue(this.TotalQty.value - this.UnitValue.value)
    console.log(this.repackageForm.value);
    
  }

}
