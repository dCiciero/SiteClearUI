import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { JobQuantity } from '../models/job-quantity.model';
import { AuthService } from '../services/auth.service';

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

  constructor(private fb: FormBuilder, private apiService: AuthService) {}

  ngOnInit(): void {
    // this.jobQuantityForm = this.fb.group({
    //   name: ['', Validators.required],
    //   itemContainerId: ['', Validators.required],
    //   itemContainerWeight: ['', Validators.required],
    //   weight: ['', Validators.required],
    //   netWeight: ['', Validators.required],
    //   invoiceItemId: ['', Validators.required],
    //   financialLineItemId: ['', Validators.required],
    //   selectedContainerType: ['', Validators.required],
    // });

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
        status:['']
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
    console.log(this.jobDetail);
    this.jobDetail.isConfirmed = true;
    return;
    
    const item: JobQuantity = {
      ContainerTypeId: data.value.selectedContainerType.id,
      ContainerWeight: data.value.selectedContainerType.weight,
      FinancialLineItemId: 11,
      InvoiceItemId: this.invoiceId,
      NetWeight: data.value.netWeight,
      Weight: data.value.weight,
      Name: this.wasetName,
      id: 2
    };
    console.log(data.value);
    console.log(item);
    this.apiService.saveJobQuantity(item).subscribe(
      (resData) =>{
        if (resData.isSuccess) {
          this.apiService.displayAlert("success", "Record saved successfully", "Success");
          console.log('Saved successfully');
          data.value.status = 'saved';
          console.log(data.value);
          
          
          setTimeout(() => {
            this.apiService.hideAlert();
          }, 5000);
        }
      },
      (error) => {
        this.apiService.displayAlert("danger", "Error saving record", "Error");
          setTimeout(() => {
            this.apiService.hideAlert();
          }, 5000);
      }
    )
    // data.value.financialLineItemId='21';
    // console.log(data.value.financialLineItemId);
    
  }

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

}
