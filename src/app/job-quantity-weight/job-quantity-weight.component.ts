import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobQuantity } from '../models/job-quantity.model';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

declare var bootstrap: any;

@Component({
  selector: 'app-job-quantity-weight',
  templateUrl: './job-quantity-weight.component.html',
  styleUrl: './job-quantity-weight.component.scss'
})
export class JobQuantityWeightComponent implements OnInit, AfterViewInit {
  @Input() quantityCount: number=0;
  @Input() driverNmae: string = "";
  @Input() wasetName: string = "";
  @Input() invoiceId: number = 0;
  @Input() jobDetail: any;
  @ViewChild('modal') modalElement!: ElementRef;
  nameOdDriver: string = "";
  jobQuantityForm: any;
  itemQuantities: any[] | undefined;
  containerTypes: any[]=[];
  selectedContainer: any;
  isFormFilled: boolean = false;
  weightForAll: number = 0;
  applyAll: boolean = false

  constructor(private fb: FormBuilder, private apiService: AuthService, private toastService: ToastService) {}

  ngOnInit(): void {
   
    console.log(this.quantityCount);
    this.itemQuantities =  Array.from(Array(this.quantityCount).keys());
    Array.from(Array(5).keys()).forEach((res)=> {console.log(res);
    })
    
    this.jobQuantityForm = this.fb.group({
      formElements: this.fb.array([])
    });

    this.getContainerTypes();
    this.initializeForm();

    
    
    
    console.log(this.containerTypes);
  }
  ngAfterViewInit(): void {
    console.log(this.quantityCount);
  }

  initializeForm() {
    console.log(this.itemQuantities);
    
    const formControls = this.jobQuantityForm.get('formElements') as FormArray;
    this.itemQuantities?.forEach(() => {
      formControls.push( this.fb.group({
        name: [this.wasetName, Validators.required],
        itemContainerId: ['', Validators.required],
        itemContainerWeight: ['', Validators.required],
        weight: ['', Validators.required],
        netWeight: ['', Validators.required],
        invoiceItemId: ['', Validators.required],
        financialLineItemId: ['', Validators.required],
        selectedContainerType: ['', Validators.required],
      }));
    });
  }

  get formElements(): FormArray {
    return this.jobQuantityForm.get('formElements') as FormArray;
  }

  addWeight(data: any) {
    //
  }
  checkWeight(data: any) {
    console.log(this.quantityCount);
  }

  getSelectedContainer() {
    console.log(this.jobQuantityForm.value);
    console.log(this.selectedContainer);
    // console.log(this.jobQuantityForm.get('selectedContainerType')?.value);
    
  }

  calculateNetWeight(index: number) {
    const control = this.formElements.at(index);
    const containerWeight = control.get('selectedContainerType')?.value.weight;
    console.log(containerWeight);
    
    const weight = control.get('weight')?.value
    if (weight) {
      const netWeight = weight - containerWeight;
      control.get('netWeight')?.setValue(netWeight);
      console.log(this.checkFormCompleteness());
      this.isFormFilled = this.checkFormCompleteness();
      
      ;
    }
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

  saveEntry(data: any) {
    
    console.log(data);
    

    const formData = this.formElements.controls; // This gets the data (formData) from each row in the table
    // var filledForm: boolean = true;
    console.log(formData);
    // return;
    let listOfJobQuantities: JobQuantity[]=[]
    // The below process will need to be modified to pass the object as an array rather than passing individaul object
    try {
      formData.forEach((data) => {
        const item: JobQuantity = {
          ContainerTypeId: data.value.selectedContainerType.id,
          ContainerWeight: data.value.selectedContainerType.weight,
          FinancialLineItemId: 11,
          InvoiceItemId: this.invoiceId,
          NetWeight: data.value.netWeight,
          Weight: data.value.weight,
          Name: this.wasetName
        };
        listOfJobQuantities.push(item);
        // this.processSave(data);
      });

      console.log(listOfJobQuantities);
      this.processSave(listOfJobQuantities);
      
      // return;
    } catch (error) {
      this.jobDetail.isWeightAdded = false;
    }
   
    
    
  }

  processSave(data: any) {
    // const item: JobQuantity = {
    //   ContainerTypeId: data.value.selectedContainerType.id,
    //   ContainerWeight: data.value.selectedContainerType.weight,
    //   FinancialLineItemId: 11,
    //   InvoiceItemId: this.invoiceId,
    //   NetWeight: data.value.netWeight,
    //   Weight: data.value.weight,
    //   Name: this.wasetName
    // };
    console.log(data);
    // console.log(item);
    this.apiService.saveJobQuantity(data).subscribe(
      (resData) =>{
        if (resData.isSuccess) {
          // this.apiService.displayAlert("success", "Record saved successfully", "Success");
          this.toastService.showSuccess('Record saved successfully');
          console.log('Saved successfully');
          console.log(resData.result);
          
          console.log(this.jobDetail);
          // this.jobDetail.isConfirmed = true;
          console.log(data.value);
          this.jobDetail.isWeightAdded = true;
          setTimeout(() => {
            var modalCloseBtn = document.getElementsByClassName('cls-btn')[0] as HTMLElement
            if (modalCloseBtn) {
              modalCloseBtn.click();
            }
          }, 2000);
          
          
          // setTimeout(() => {
          //   this.apiService.hideAlert();
          // }, 5000);
        }
      },
      (error) => {
        // this.apiService.displayAlert("danger", "Error saving record", "Error");
        this.toastService.showError("Error saving record");
          // setTimeout(() => {
          //   this.apiService.hideAlert();
          // }, 5000);
      }
    )
  }

  // This method is used to check if all details(row) have been entered
  checkFormCompleteness(): boolean {
    const formData = this.formElements.controls;
    var filledForm: boolean = true;
    formData.forEach((data) => {
      console.log(data.value.netWeight);
      if (!data.value.netWeight) {
        filledForm = false
      }
    });
    return filledForm;
  }

  toggleApplyToAll(evt: any) {
    console.log(evt);
    this.applyAll = !this.applyAll;
    if (!this.applyAll) {
      this.jobQuantityForm.reset();
      this.weightForAll = 0;
      this.selectedContainer = null;
      this.isFormFilled = this.checkFormCompleteness();
    }
    console.log(this.applyAll);
    
  }

  applyWeights() {
    let weight = (document.getElementById('txtAllWeight') as HTMLInputElement)?.value
    let formControls = this.formElements.controls;
    console.log(weight);
    console.log(this.weightForAll);
    console.log(this.jobQuantityForm);
    console.log(formControls.length);
    formControls.forEach((ctrl: any) => {
      ctrl.controls.weight.patchValue(weight);
      ctrl.controls.selectedContainerType.patchValue(this.selectedContainer);
      // let netW = this.weightForAll - this.selectedContainer.weight
      ctrl.controls.netWeight.patchValue(this.weightForAll - this.selectedContainer.weight);
      console.log(ctrl.controls);
      
    })
    this.isFormFilled = this.checkFormCompleteness();
    
  }

}
