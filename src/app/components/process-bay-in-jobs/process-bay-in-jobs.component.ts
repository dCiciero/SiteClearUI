import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { JobDetails } from '../../models/job-details.model';

@Component({
  selector: 'app-process-bay-in-jobs',
  templateUrl: './process-bay-in-jobs.component.html',
  styleUrl: './process-bay-in-jobs.component.scss'
})
export class ProcessBayInJobsComponent implements OnInit {
  signOffForm: any;
  // paginatedItems: any[] = [];
  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  alertMessage: string = "";
  alertType: string = "";
  messageType: string = "";
  transferedJobsToSign: JobDetails[]=[];
  paginatedItems: JobDetails[]=[];
  confirmedJobToSignOff: any; // JobDetails | undefined;
  showModal: boolean = false;
  isLoading: boolean = false;
  jobQuantities: any[]=[];
  filterText: any;
  displayRepackageModal: boolean = false;

  constructor(private apiService: AuthService, private fb: FormBuilder, private toastService: ToastService) {
    
  }

  ngOnInit(): void {
    this.signOffForm = this.fb.group({
      selectedBayId: ['', Validators.required],
      selectedHoldingBay: [''],
      selectedProcessingBay: [''],
      netWeight: [''],
      selectedBayOption: ['']
    });
    this.onFilterChange();
    this.getJobsToSignOff();

  }

  getFormControlValue(controlName: string): any {
    return this.signOffForm.get(controlName)?.value;
  }
  getJobsToSignOff() {
    this.apiService.getJobDetailsForSignOff()
      .subscribe((res: any) => {
        console.log(res);
        // this.confirmedJobs = res.result;
        console.log(res.result);
        this.transferedJobsToSign = res.result;
        // this.confirmedJobs = res.result.filter((element: any) => {
        //   return element.processingBay !== null && !element.isSignedOff
        // });
        this.paginatedItems = this.transferedJobsToSign;
        console.log(this.transferedJobsToSign)
        
      },error => {
        console.log("Error getting signed off data");
      })
  }
  onFilterChange(text: string='') {
    const filteredItems = this.filterItems(this.transferedJobsToSign, text);
    console.log(filteredItems);
    this.paginatedItems = filteredItems;
    
  }

  filterItems(items: any, filteredText: any): any [] {
    return items.filter((item: any) => {
      // Add your filtering logic here
      // For example, if you want to filter by job title:
      return item.processingBay.name.toLowerCase().includes(filteredText.toLowerCase());
      
      // If you want to filter by multiple criteria, you can add more conditions:
      // return item.job.title.toLowerCase().includes(filterCriteria.toLowerCase()) ||
      //        item.jobDetail.description.toLowerCase().includes(filterCriteria.toLowerCase());
    });
  }
 

// This function is to signOff jobs from the processing bay
  processSignOff(data: any) {
    this.confirmedJobToSignOff = data
    this.displayRepackageModal = true
    console.log(this.signOffForm.value);
    console.log(data);
    // this.confirmedJobToSignOff = data
    // this.confirmedJobToSignOff.isSignedOff=true;
    // this.confirmedJobToSignOff.signOffDate= moment(new Date()).format('YYYY-MM-DD');
    // var updatedJob = this.confirmedJobToSignOff;
    // console.log(this.confirmedJobToSignOff)

    // **************The below will be uncommented later ***************************
    // this.apiService.updateJobItem(updatedJob).subscribe(
    //   (res) => {
    //     console.log(res)
    //     if (res.isSuccess) {
    //       this.toastService.showSuccess("Job has been successfully signed off");
    //       this.getConfirmedJobs();
    //     }
    //   },
    //   (error) => {
    //     console.log(error.error);
    //     this.toastService.showError("An error occured while signing of tje job. Please try again");
    //   },
    //   () => {

    //   }
    // )
  }

  getDataToSignOff(data: any) {
    this.confirmedJobToSignOff = data
    console.log(data)
  }

  getJobQuantities(id: any) {
    this.apiService.getJobQuantitiesByInvoiceId(id).subscribe(
      (resData) => {
        console.log(resData);
        if (resData.isSuccess)
        {
          this.jobQuantities = resData.result
          console.log(this.jobQuantities);
          
        }

        
      },
      (error) => {
        console.log(error.error);
        this.toastService.showError("Error occured while trying to get the details.");
      }
    )
  }

  closeRepackagingModal() {
    this.displayRepackageModal = false;
  }


  updatePaginatedItems(): void {
    console.log("Getting paginated items");
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedItems = this.transferedJobsToSign.slice(startIndex, startIndex + this.pageSize);
  }

  getTotalPages(): number {
    // const totalItems = this.jobs.reduce((count, parent) => count + parent.jobDetails.length, 0);
    // return Math.ceil(totalItems / this.pageSize);
    return Math.ceil(this.transferedJobsToSign.length / this.pageSize);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedItems();
  }
}
