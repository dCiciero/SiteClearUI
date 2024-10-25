import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobQuantity } from '../models/job-quantity.model';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { ConfirmationService } from '../services/confirmation.service';
import { ApiResponse } from '../models/api-response.model';

declare var bootstrap: any;

@Component({
  selector: 'app-job-quantity-weight',
  templateUrl: './job-quantity-weight.component.html',
  styleUrl: './job-quantity-weight.component.scss'
})
export class JobQuantityWeightComponent implements OnInit, AfterViewInit {
  @Input() quantityCount: number=0;
  @Input() driverName: string = "";
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
  totalNetWeight: number = 0;
  applyAll: boolean = false
  isLoading: boolean = false; 

  constructor(private fb: FormBuilder, 
              private apiService: AuthService, 
              private toastService: ToastService,
              private confirmationService: ConfirmationService
            ) {}

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
    console.log(this.formElements);
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
    // console.log(formData);
    // return;
    let listOfJobQuantities: JobQuantity[]=[]
    let financialItemsAndJobQuantities = {};
    // The below process will need to be modified to pass the object as an array rather than passing individaul object
    try {
      formData.forEach((data) => {
        const item: JobQuantity = {
          ContainerTypeId: data.value.selectedContainerType.id,
          ContainerWeight: data.value.selectedContainerType.weight,
          FinancialLineItemId: 0,
          InvoiceItemId: this.invoiceId,
          NetWeight: data.value.netWeight,
          Weight: data.value.weight,
          Name: this.wasetName
        };
        this.totalNetWeight += data.value.netWeight;
        listOfJobQuantities.push(item);
        // this.processSave(data);
      });

      this.jobDetail.isWeightAdded = true;
      this.jobDetail.totalWeight = this.totalNetWeight;
      this.jobDetail.isConfirmed = true;
      this.jobDetail.processedById = localStorage.getItem('userId');

      financialItemsAndJobQuantities = {
        financialLineItem: this.jobDetail,
        jobQuantityRequestDTOs: listOfJobQuantities
      };
      console.log(listOfJobQuantities);
      console.log(financialItemsAndJobQuantities);
      this.processSave(financialItemsAndJobQuantities);
      
      //  return;
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
    // console.log(this.totalNetWeight);
    // this.jobDetail.isWeightAdded = true;
    // this.jobDetail.totalWeight = this.totalNetWeight;
    // this.jobDetail.isConfirmed = true;
    // console.log(this.jobDetail);
    // return
    this.confirmationService.confirm({
      title: 'Confirm Save?',
      message: 'This action will save this entry and confirm the job.',
      confirmText: 'Yes, Save',
      cancelText: 'No, Cancel',
      confirmButtonType: 'warning'
    }).subscribe(result => {
      if (result) {
        console.log('Saving item...');
        console.log(result);
        this.saveJobDetailsWithAddedWeight(data);
        // this.saveJobQuantityWeights(data);
        
        // Perform delete action
      }
    });
    return;
    // console.log(item);
    
  }

  //This function is used to save the captured weights of each job quantity. (Recent refactoring has made it irrelevant and will be removed later)
  saveJobQuantityWeights(data: any) {
    this.apiService.saveJobQuantity(data).subscribe(
      (resData) =>{
        if (resData.isSuccess) {
          console.log('Saved successfully');
          console.log(resData.result);
          console.log(this.jobDetail);
          console.log(data.value);
          // this.jobDetail.isWeightAdded = true;
          // this.jobDetail.totalWeight = this.totalNetWeight;
          // this.jobDetail.isConfirmed = true;
          console.log('confirming job details');
          
          this.saveJobDetailsWithAddedWeight(this.jobDetail);
          // setTimeout(() => {
          //   var modalCloseBtn = document.getElementsByClassName('cls-btn')[0] as HTMLElement
          //   if (modalCloseBtn) {
          //     modalCloseBtn.click();
          //   }
          // }, 2000);
          
        }
      },
      (error) => {
        this.toastService.showError("Error saving record");
        console.log(error);
      }
    )
  }

  // This operation saves the job details(FinancialLineItems) as confirmed job and also the added weights for each quantity
  //This inserts new record into FinancialLineItems table
  saveJobDetailsWithAddedWeight(weightedJob: any) {
    this.apiService.saveJobItem(weightedJob)
      .subscribe((res: ApiResponse) => {
        console.log(res);
        if (res.isSuccess == true)
        {
          this.toastService.showSuccess('Successfully confirmed');
          setTimeout(() => {
            var modalCloseBtn = document.getElementsByClassName('cls-btn')[0] as HTMLElement
            if (modalCloseBtn) {
              modalCloseBtn.click();
            }
          }, 2000);
          
        }
        else {
          this.toastService.showError("Error making sign off request "+ res.errorMessages.join(" "));
          console.log();
        }
        this.isLoading = false;
      },
    error => {
      console.log(error);
      this.toastService.showError("Error making sign off request:\n" + error.error);
      console.log(error.error);
      
      this.isLoading = false;
    })
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
