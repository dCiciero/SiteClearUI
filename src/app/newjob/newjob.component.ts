import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Jobs } from '../models/jobs.model';
import { ToastService } from '../services/toast.service';
import moment from 'moment';

@Component({
  selector: 'app-newjob',
  templateUrl: './newjob.component.html',
  styleUrl: './newjob.component.scss'
})
export class NewjobComponent implements OnInit {
  form: any;
  listOfJobs: any[]=[];
  outBays: any[] = [];
  isLoading = false;
  displayJobs: boolean = false;
  containerTypes: any[]=[];
  wasteStreams: any[]=[];
  listOfProcessingBays: any[]=[];
  filteredJobs: any[]=[];
  filterText: any;

  constructor(private fb: FormBuilder, private apiService: AuthService, private toastService: ToastService){
    this.form = fb.group({
      processingBayId: ['', Validators.required],
      wasteStream: ['', Validators.required],
      weight: ['', Validators.required],
      netWeight: ['0', Validators.required],
      // itemDescription: ['', Validators.required],
      packageType: ['', Validators.required],
      outBayId: ['', Validators.required],
    });
    

    this.getAllOutgoingJobs();
    this.getContainerTypes();
    this.getWasteStreams();
    this.loadOutBays();
    this.getProcessingingBays();
    console.log(apiService.loadOutBays());
    console.log(apiService.listOfHoldingBays);
  }

  ngOnInit(): void {
    this.onFilterChange();
  }

  getAllOutgoingJobs() {
    this.apiService.getAllWaste().subscribe(res => {
      if (res.isSuccess) {
        this.listOfJobs = res.result.filter((rec: any) => {
          return !rec.isSentForDisposal
        });

        this.filteredJobs = this.listOfJobs
        console.log(this.listOfJobs);
        
        // this.displayAlert("success", "Successfully signed off", "Success");

        // setTimeout(() => {
        //   this.hideAlert();
          
        // }, 5000);
      }
    }, error => {
      console.log("Error loading job list: \n" + error.error);
    })
  }

  createJob() {
    console.log(this.form.value);
    // return;
    if (!this.form.valid)
    {
      // this.displayAlert("danger", "Please enter all entries", "Error");
      this.toastService.showError("Please enter all entries");
      return;
    }
    const request = {
      weight: this.form.get('weight').value,
      outBayId: this.form.get('outBayId').value,
      processingBayId: this.form.get('processingBayId').value,
      packageType: this.form.get('packageType').value.name,
      packageSize: this.form.get('packageType').value.weight,
      wasteStreamId: this.form.get('wasteStream').value.id,
      // wasteCategoryId: this.form.get('wasteStream').value.Id,
      dateCreated: moment(new Date()).format('YYYY-MM-DD')
    };
    console.log(request);
    // return;
    // request.itemDescription = "Waste stream creation";
    this.apiService.createWaste(request).subscribe(res => {
      console.log(res);
      if (res.isSuccess){
        // this.displayAlert("success", "Job Created Successfully", "Success");
        this.toastService.showSuccess("Job Created Successfully");
        
        this.getAllOutgoingJobs();

        this.form.reset();

        // setTimeout(() => {
        //   this.hideAlert();
          
        // }, 5000);
      }
      else {
        // this.displayAlert("danger", "Error creating job "+ res.errorMessages.join(" "), "Error");
        this.toastService.showError("Error creating job "+ res.errorMessages.join(" "));
      }
    }, error => {
      console.log(error.error);
      // this.displayAlert("danger", "Error creating job:\n" + error.error, "Error");
      this.toastService.showError("Error creating job:\n" + error.error);
      this.isLoading = false;
    })
  }

  calculateNetWeight() {
    const WEIGHT = this.form.get('weight')?.value;
    const CONTAINER_WEIGHT = this.form.get('packageType')?.value.weight;
    console.log(WEIGHT);
    console.log(CONTAINER_WEIGHT);
    var netWeight = WEIGHT - CONTAINER_WEIGHT
    console.log(`Calculated weight is: ${netWeight}`);
    if (netWeight && netWeight > 0)
      this.form.get('netWeight')?.setValue(netWeight) ;
    else
      this.form.get('netWeight')?.setValue('0') ;
    console.log(this.form.value);
    

    // this.form.setValue(
    //   {
    //     'netWeight': WEIGHT - CONTAINER_WEIGHT
    //   }
    // );
    
  }

  get netWeight() {
    return this.form.get('netWeight')?.value;
  }
  loadOutBays() {
    this.apiService.getOutBays().subscribe(res => {
      if (res.isSuccess) {
        this.outBays = res.result
      }
    })
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

  getWasteStreams() {
    this.apiService.getWasteStreams().subscribe(
      (resData: any) => {
        if (resData.isSuccess == true) {
          this.wasteStreams = resData.result;
        }
      },
      (error) => {
        console.log("Error getting container types")
      }
    );
  }

  getProcessingingBays() {
    this.apiService.getProcessingBays().subscribe(res => {
      if (res.isSuccess) {
        this.listOfProcessingBays = res.result
      }
    })
  }

  getSelectedProcessingBay(evt: any) {
    console.log(evt.target.value);
    this.form.get('processingBayId').value = evt.target.value;
    console.log(this.form.value)
  }

  toggleDisplayJobs() {
    this.displayJobs = !this.displayJobs;
  }

  selectedOutBay(evt: any) {
    console.log(evt.target.value);
    this.form.get('outBayId').value = evt.target.value;
    console.log(evt.target.innerText);
    console.log(this.form.value)
  }

  getSelectedContainer() {
    console.log(this.form.value);
    // console.log(this.jobQuantityForm.get('selectedContainerType')?.value);
    
  }
  getSelectedWasteStream() {
    console.log(this.form.value);
    // console.log(this.jobQuantityForm.get('selectedContainerType')?.value);
    
  }

  onFilterChange(text: string='') {
    const filteredItems = this.filterItems(this.listOfJobs, text);
    console.log(filteredItems);
    this.filteredJobs = filteredItems;
    
  }

  filterItems(items: any, filteredText: any): any [] {
    return items.filter((item: any) => {
      // Add your filtering logic here
      // For example, if you want to filter by job title:
      return item.outBay?.name.toLowerCase().includes(filteredText.toLowerCase());
      
      // If you want to filter by multiple criteria, you can add more conditions:
      // return item.job.title.toLowerCase().includes(filterCriteria.toLowerCase()) ||
      //        item.jobDetail.description.toLowerCase().includes(filterCriteria.toLowerCase());
    });
  }

  sendForDisposal(data: any) {
    data.isSentForDisposal = true;
    console.log(data);
    this.apiService.updateWaste(data).subscribe(res => {
      if (res.isSuccess) {
        // this.listOfJobs = res.result;
        // this.filteredJobs = this.listOfJobs
        // console.log(this.listOfJobs);
        this.toastService.showSuccess("Operation Successful");
        this.getAllOutgoingJobs();
      }

      else {
        this.toastService.showError("Operation Not Successful");
      }
    }, error => {
      console.log("Error sending for disposal: \n" + error.error);
      this.toastService.showError("Error Occured");
    })
    
  }
}
