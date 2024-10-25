import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JobDetails } from '../models/job-details.model';
import { Jobs } from '../models/jobs.model';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiResponse } from '../models/api-response.model';
import moment from 'moment';
import { ToastService } from '../services/toast.service';

declare var bootstrap: any;

@Component({
  selector: 'app-unsigned-off-item',
  templateUrl: './unsigned-off-item.component.html',
  styleUrl: './unsigned-off-item.component.scss'
})
export class UnsignedOffItemComponent implements OnInit {
  @ViewChild('modal') modalElement!: ElementRef;
  form: any;
  datepicker: any = document.getElementById('datepicker');
  jobs: Jobs[]=[];
  startDate: any;
  endDate: any;
  isToday: boolean = false;
  paginatedItems: { job: Jobs, jobDetail: JobDetails }[] = [];;
  //paginatedItems: any[] = [];
  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  alertMessage: string = "";
  alertType: string = "";
  messageType: string = "";
  financialItems: JobDetails[]=[];
  signedOffJobs: JobDetails[]=[];
  filteredItems: any[]=[];
  filterText: string = '';
  weighedJob: JobDetails | undefined;
  showModal: boolean = false;
  isLoading: boolean = false; 
  quantityCount: number = 1;
  driverName: string = "";
  wasteName: string = "";
  invoiceId: number = 0;
  financialLineId: number = 0;
  
  
  constructor(private fb: FormBuilder, private apiService: AuthService, private toastService: ToastService) {
    this.form = fb.group({
      description: ['', Validators.required],
      weight: ['', Validators.required],
      quantity: ['', Validators.required]
    });

    // const elementId = this.elementRef.nativeElement.id;
    // this.getSignedOffJobsByDate();
    // this.datepicker.datepicker();
  }

  ngOnInit(): void {
    this.onFilterChange();
  }

  setToday() {
    // this.isToday = !this.isToday
    var date = new Date();
    console.log(this.isToday);
    console.log(date);
    console.log(date.toLocaleString('en-US'));
    const formattedDate = moment(date).format('YYYY-MM-DD');
    console.log(`Formatted date: ${formattedDate}`);  
    this.startDate = formattedDate;
    this.endDate = formattedDate;
    

    if (!this.isToday)
    {
      this.startDate = undefined;
      this.endDate = undefined;
    }
    
  }

  getJobsByDate() {
    //debugger;
    this.isLoading = true;
    this.jobs = [];
    if (this.endDate < this.startDate)
    {
      // this.displayAlert("danger", "End Date must be greater than or equal to start date", "Error");
      this.toastService.showError("End Date must be greater than or equal to start date");
      // this.alertMessage = "End Date must be greater than or equal to start date";
      this.isLoading=false;
      return;
    }
    else {
      // this.hideAlert();

      var requestParams = {
        // "Id": 2134,
        "action": "jobslist",
        "startDate": this.startDate,
        "endDate": this.endDate
      }
      this.apiService.getJobsByDate(requestParams)
        .subscribe(
          data => {
            console.log(data);
            this.jobs = data.result.result; //.filter((filteredRec: any) => {
            //   return filteredRec.status === 'Completed'
            // })
            if (this.jobs.length == 0)
            {
              // this.displayAlert("info", "No record for selected date", "Info")
              this.toastService.showInfo("No record for selected date");
              this.isToday = false;
              this.startDate = undefined;
              this.endDate = undefined;

              // setTimeout(() => {
              //   this.hideAlert();
              // }, 5000);
            }
  
            this.jobs.forEach(job=> {
              if (job.jobDetails.length > 0)
                {
                  job.jobDetails = job.jobDetails.filter(ele => {
                    return ele.lineType == 'Predefined';
                  });
  
                  job.jobDetails.map(ele => {
                    ele.totalWeight = 0;
                    ele.isConfirmed = false;
                    // ele.furtherProcessing = false;
                  });
                  
                }
            })
            
            console.log(this.jobs);
            console.log("After logging out");
            this.totalPages = Math.ceil(this.jobs.length / this.pageSize);
            // this.paginatedItems;
            this.updatePaginatedItems();
            this.isLoading = false;
        },
          error =>{
            // this.displayAlert("danger", "Error getting record. Try again", "Error");
            this.toastService.showError( "Error getting record. Try again");
            console.log(error);
            this.isLoading = false;
            return;
            
          }
        )
        
    }
  }

  updatePaginatedItems(): void {
    console.log("Getting paginated items");
    const allItems: {job: Jobs, jobDetail: JobDetails}[] = [];
    this.jobs.forEach(job => {
      job.jobDetails.forEach(jobDetail => {
        allItems.push({ job, jobDetail });
      });
    });
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedItems = allItems.slice(startIndex, startIndex + this.pageSize);
    // return this.jobs.slice(startIndex, endIndex);
    //this.paginatedItems = this.jobs.slice(startIndex, startIndex + this.pageSize);
  }

  getTotalPages(): number {
    const totalItems = this.jobs.reduce((count, parent) => count + parent.jobDetails.length, 0);
    return Math.ceil(totalItems / this.pageSize);
    //return Math.ceil(this.jobs.length / this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.onFilterChange(this.filterText)
    //this.updatePaginatedItems();
  }

  checkWeight(data: any) {
    console.log(data)
  }

  processWeight(data:{job: Jobs, jobDetail: JobDetails}) {
    this.quantityCount = data.jobDetail.lineQuantity;
    this.driverName = data.job.resource;
    this.wasteName = data.jobDetail.itemDescription;
    this.invoiceId = data.jobDetail.invoiceItemId;
    // this.financialLineId = data.jobDetail.invoiceItemId;
    // this.weighedJob = data.jobDetail;
    this.weighedJob = data.jobDetail;
    this.weighedJob.asset = data.job.asset;
    this.weighedJob.resource = data.job.resource;
    this.weighedJob.jobCount = data.job.jobDetails.length; //this is for job with same refNo/jobId
    console.log(this.weighedJob);
    console.log(data.job.jobDetails.length);
    console.log(this.quantityCount);
    this.showModal = true;
  }
  
  //This method is to save the jobDetail
  confirmJob(data:{job: Jobs, jobDetail: JobDetails}) {
    
    // var modalElement = document.getElementById('gaga')
    // console.log(modalElement);
    
    // if (modalElement) {
      // const modal = new bootstrap.Modal(modalElement);
      // modal.show();
    // }

    // setTimeout(() => {
    //   const modal = new bootstrap.Modal(this.modalElement.nativeElement);
    //   modal.show();
    // });

    this.isLoading = true;
    console.log(data);
    this.weighedJob = data.jobDetail;
    this.weighedJob.asset = data.job.asset;
    this.weighedJob.resource = data.job.resource;

    // if (data.jobDetail.weight <= 0 || !this.isDigit(data.jobDetail.weight.toString())) {
    //   this.displayAlert("danger", "Enter a valid weight", "Error");
    //   setTimeout(() => {
    //     this.hideAlert();
    //   }, 5000);
    //   console.log(typeof this.weighedJob.weight);
    //   console.log();
    //   console.log(/^\d+$/.test(this.weighedJob.weight.toString()));
    //   this.isLoading = false;
    //   return;
    // }
    // if (typeof data.weight !== "number"){
    //   this.displayAlert("danger", "Enetr a valid weight", "Error");
      
    //   this.isLoading = false;
    //   return;
    // }

    this.weighedJob.isConfirmed = !data.jobDetail.isConfirmed;
    // data.jobDetail.totalWeight = 120; // This will be taken off later as it is no longer needed
    console.log(this.weighedJob);
    // return;
    this.apiService.saveJobItem(this.weighedJob)
      .subscribe((res: ApiResponse) => {
        console.log(res);
        if (res.isSuccess == true)
        {
          // this.displayAlert("success", "Successfully confirmed", "Success");
          this.toastService.showSuccess('Successfully confirmed');
          //this.getJobsByDate();
          // this.getSignedOffJobsByDate();
          
          setTimeout(() => {
            this.hideAlert();
            
          }, 5000);
        }
        else {
          this.displayAlert("danger", "Error making sign off request "+ res.errorMessages.join(" "), "Error");
        }
        this.isLoading = false;
      },
    error => {
      console.log(error);
      this.displayAlert("danger", "Error making sign off request:\n" + error.error, "Error");
      this.isLoading = false;
    })
  }

  displayAlert(type: string, message: string, messageType: string) {
    this.messageType = messageType;
    this.alertType = type;
    this.alertMessage = message;
  }

  hideAlert() {
    this.alertMessage = "";
    this.alertType = "";
    this.messageType = "";
  }

  isDigit(data: string): boolean {
    return /^\d+$/.test(data);
  }

  onFilterChange(filterText: string=''): void {
    const allItems: {job: Jobs, jobDetail: JobDetails}[] = [];
    this.jobs.forEach(job => {
      job.jobDetails.forEach(jobDetail => {
        allItems.push({ job, jobDetail });
      });
    });

    // Apply filter
    const filteredItems = this.filterItems(allItems, filterText);

    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedItems = filteredItems.slice(startIndex, startIndex + this.pageSize);

    // Update total items for pagination
    this.totalPages = filteredItems.length;
    console.log(this.totalPages)
    console.log(this.pageSize)
  }

  filterItems(items: {job: Jobs, jobDetail: JobDetails}[], filterCriteria: any): {job: Jobs, jobDetail: JobDetails}[] {
    return items.filter(item => {
      // Add your filtering logic here
      // For example, if you want to filter by job title:
      return item.job.resource.toLowerCase().includes(filterCriteria.toLowerCase());
      
      // If you want to filter by multiple criteria, you can add more conditions:
      // return item.job.title.toLowerCase().includes(filterCriteria.toLowerCase()) ||
      //        item.jobDetail.description.toLowerCase().includes(filterCriteria.toLowerCase());
    });
  }

  closeModal() {
    this.showModal = false;
    console.log('closing..................');
    
  }

}
