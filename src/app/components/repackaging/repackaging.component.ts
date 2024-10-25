import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-repackaging',
  templateUrl: './repackaging.component.html',
  styleUrl: './repackaging.component.scss'
})
export class RepackagingComponent implements OnInit, OnDestroy {
  @Input() financialItem: any;
  // @Input() jobReference: any;
  // @Input() itemDescription: any;
  isLoading = false;
  repackageForm: any;
  containerTypes: any[]=[];
  disablePercentageControl: boolean = true;
  jobReference: any;
  itemDescription: any;
  repackagedItems: any[] = [];
  saveEntries: boolean = false;
  initialTotalQty: number = 0;
  remainingTotalQty: number = 0;
  totalDistribution: number = 0;
  totalPercentage: number = 0;
  

  constructor(private apiService: AuthService, private fb: FormBuilder, private toastrService: ToastService) {}
  
  ngOnInit(): void {
    this.repackageForm = this.fb.group({
      availableQty: [0, Validators.required],
      remainingQty: [0, Validators.required],
      container: ['', Validators.required],
      containerId: ['', Validators.required],
      quantity: [ ,Validators.required],
      percentageQty: [0, Validators.required],
      financialLineId: ['', Validators.required],
    });

    this.getContainerTypes();
    console.log(this.financialItem);
    this.RemainingQty.setValue(this.financialItem.totalWeight);
    this.AvailableQty.setValue(this.financialItem.totalWeight);
    this.initialTotalQty = this.financialItem.totalWeight;
    this.remainingTotalQty = this.financialItem.totalWeight;
    this.FinancialLineId.setValue(this.financialItem.id);
    this.jobReference = this.financialItem.jobReference;
    this.itemDescription = this.financialItem.itemDescription;
    
  }

  ngOnDestroy(): void {
    this.closeModal();
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

  get RemainingQty() {
    return this.repackageForm.get('remainingQty');
  }

  get AvailableQty() {
    return this.repackageForm.get('availableQty');
  }

  get PercentageValue() {
    return this.repackageForm.get('percentageQty');
  }
  get FinancialLineId() {
    return this.repackageForm.get('financialLineId');
  }

  get UnitValue() {
    return this.repackageForm.get('unit');
  }

  get Quantity() {
    return this.repackageForm.get('quantity');
  }

  get Container() {
    return this.repackageForm.get('container');
  }
  get ContainerId() {
    return this.repackageForm.get('containerId');
  }

  calculatePercentage() {
    const PERCENTAGE = 100;
    let availableQty = this.AvailableQty.value;
    let remainingQty = this.RemainingQty.value;
    let qtyValue = this.Quantity.value

    if (qtyValue > this.remainingTotalQty) {
      this.toastrService.showError("Quantity cannot be more than total quantity");
      this.Quantity.setValue(0);
      this.PercentageValue.setValue(0);
      return;
    }
    // let percentageValue = this.PercentageValue.value;
    let calculatedPercentage = (qtyValue/availableQty) //* PERCENTAGE;
    console.log(calculatedPercentage);
    console.log(calculatedPercentage.toFixed(2));
    this.PercentageValue.value = calculatedPercentage.toFixed(2);
    this.PercentageValue.setValue(calculatedPercentage.toFixed(2));
    this.RemainingQty.setValue(this.remainingTotalQty - this.Quantity.value)
    this.ContainerId.setValue(this.Container.value.id)
    // let availableQty = this.AvailableQty.value;
    console.log(this.repackageForm.value);
    // if (this.AvailableQty.value == 0) {
    //   this.saveEntries = true;
    // }
    // this.repackeagedItems.push(this.repackageForm.value);
    // console.log(this.repackeagedItems);
    // if (this.AvailableQty.value > 0){
    //   this.repackageForm.reset()
    //   this.TotalQty.setValue(availableQty)
    // }
    
  }

  // This method is called when there are still some items left, that is available quantity is > 0
  completeRepackaging() {
    this.remainingTotalQty = this.RemainingQty.value;
    this.repackagedItems.push(this.repackageForm.value);
    console.log(this.repackagedItems);
    if (this.RemainingQty.value > 0){
      // this.repackageForm.reset()
      // this.TotalQty.setValue(availableQty)
      this.Quantity.reset();
      this.Container.reset();
      this.PercentageValue.reset();
      // this.FinancialLineId.setValue(this.financialItem.id);
    }
    if (this.RemainingQty.value == 0) {
      this.saveEntries = true;
      this.totalDistribution = this.repackagedItems.reduce((sum:number, item:any) => sum + Number(item.quantity), 0);
      this.totalPercentage = this.repackagedItems.reduce((sum:number, item:any) => sum + Number(item.percentageQty), 0);
      console.log(this.totalDistribution);
      console.log(this.totalPercentage);
      
    }
  }

  closeModal() {
    this.repackageForm.reset();
    console.log('form resetting....');
  }

  saveEntry() {
    // console.log(this.repackageForm.value);
    this.apiService.createRepackagedWaste(this.repackagedItems).subscribe(
      (res: any) => {
        console.log(res);
        if ( res.isSuccess){
          this.toastrService.showSuccess("Successful");
          setTimeout(() => {
            var modalCloseBtn = document.getElementsByClassName('cls-btn')[0] as HTMLElement
            if (modalCloseBtn) {
              modalCloseBtn.click();
            }
          }, 2000);
        }
        else{
          this.toastrService.showError("Error occured");
        }
      },
      (error: any) => {
        this.toastrService.showError("System error occured");
      },
      () =>{
        console.log('Complete process');
        
      }
    )
  }

}
