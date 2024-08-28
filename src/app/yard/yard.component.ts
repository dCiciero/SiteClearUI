import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { JobDetails } from '../models/job-details.model';
import { Jobs } from '../models/jobs.model';
import { ApiResponse } from '../models/api-response.model';

@Component({
  selector: 'app-yard',
  templateUrl: './yard.component.html',
  styleUrl: './yard.component.scss'
})
export class YardComponent {

  @ViewChild('modalSC') modalSC: any
  form: any;
  datepicker: any = document.getElementById('datepicker');
  jobs: Jobs[]=[];
  startDate: any;
  endDate: any;
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
  signedOffJob: JobDetails | undefined;
  showModal: boolean = false;
  isLoading: boolean = false; 
  // isDigit: boolean = true; 

  constructor(private fb: FormBuilder, public apiService: AuthService, private elementRef: ElementRef<HTMLElement>) {
    // this.form = fb.group({
    //   description: ['', Validators.required],
    //   weight: ['', Validators.required],
    //   quantity: ['', Validators.required]
    // });

    // const elementId = this.elementRef.nativeElement.id;
    // this.getSignedOffJobsByDate();
    // this.datepicker.datepicker();
  }

  

  // getSignedOffJobsByDate() {
  //   this.apiService.getJobDetails()
  //     .subscribe((res: any) => {
  //       console.log(res);
  //       this.signedOffJobs = res.result;
  //     },error => {
  //       console.log("Error getting signed off data");
  //     })
  // }

  // // updatePaginatedItems(): void {
  // //   const startIndex = (this.currentPage - 1) * this.pageSize;
  // //   //this.paginatedItems = this.jobs.slice(startIndex, startIndex + this.pageSize);
  // // }

  // // get paginatedItems(): { job: Jobs, jobDetail: JobDetails }[] {
  // //   console.log("Getting paginated items");
  // //   const allItems: {job: Jobs, jobDetail: JobDetails}[] = [];
  // //   this.jobs.forEach(job => {
  // //     job.jobDetails.forEach(jobDetail => {
  // //       allItems.push({ job, jobDetail });
  // //     });
  // //   });
  // //   const startIndex = (this.currentPage - 1) * this.pageSize;
  // //   const endIndex = startIndex + this.pageSize;
  // //   return allItems.slice(startIndex, endIndex);
  // //   // return this.jobs.slice(startIndex, endIndex);
  // //   //this.paginatedItems = this.jobs.slice(startIndex, startIndex + this.pageSize);
  // // }

  // updatePaginatedItems(): void {
  //   console.log("Getting paginated items");
  //   const allItems: {job: Jobs, jobDetail: JobDetails}[] = [];
  //   this.jobs.forEach(job => {
  //     job.jobDetails.forEach(jobDetail => {
  //       allItems.push({ job, jobDetail });
  //     });
  //   });
  //   const startIndex = (this.currentPage - 1) * this.pageSize;
  //   this.paginatedItems = allItems.slice(startIndex, startIndex + this.pageSize);
  //   // return this.jobs.slice(startIndex, endIndex);
  //   //this.paginatedItems = this.jobs.slice(startIndex, startIndex + this.pageSize);
  // }

  // getTotalPages(): number {
  //   const totalItems = this.jobs.reduce((count, parent) => count + parent.jobDetails.length, 0);
  //   return Math.ceil(totalItems / this.pageSize);
  //   //return Math.ceil(this.jobs.length / this.pageSize);
  // }

  // changePage(page: number): void {
  //   if (page >= 1 && page <= this.getTotalPages()) {
  //     this.currentPage = page;
  //   }
  // }

  // goToPage(page: number): void {
  //   this.currentPage = page;
  //   this.updatePaginatedItems();
  // }

  // getJobDetails(jobId: number) {
  //   var requestParams = {
  //     "action": "JobFinancialLines",
  //     "jobId": jobId
  //   }
  //   this.apiService.getJobDetailById(requestParams)
  //     .subscribe(data => {
  //       console.log(data);
  //       this.financialItems = data.result.result.filter((rec :any) => {
  //         return rec.lineType == 'Predefined'
  //       })
  //         console.log(this.financialItems);
  //         if (this.financialItems.length > 0)
  //           this.financialItems.map(ele => { ele.weight=0 })
  //         console.log(this.financialItems);
  //         // console.log(this.financialItems[0].weight);
  //         //this.apiService.setJobDetails(this.financialItems);
  //       // setTimeout(() => {
          
  //       // }, 2000);
        
  //       // var modal = document.querySelector("#jobDetailsModal");
  //       // var modal2 = document.getElementById("jobDetailsModal");
  //       // console.log(modal)
  //       // console.log(modal2)
  //       // this.modalSC.open();

  //     },
  //   error => {
  //     console.log(error);
  //   })
  // }

  // checkWeight(data: any) {
  //   console.log(data)
  // }
  // signOff(data:{job: Jobs, jobDetail: JobDetails}) {
  //   this.isLoading = true;
  //   console.log(data);
  //   this.signedOffJob = data.jobDetail;
  //   this.signedOffJob.asset = data.job.asset;
  //   this.signedOffJob.resource = data.job.resource;
  //   if (data.jobDetail.weight <= 0 || !this.isDigit(data.jobDetail.weight.toString())) {
  //     this.displayAlert("danger", "Enetr a valid weight", "Error");
  //     console.log(typeof this.signedOffJob.weight);
  //     console.log();
  //     console.log(/^\d+$/.test(this.signedOffJob.weight.toString()));
  //     this.isLoading = false;
  //     return;
  //   }
  //   // if (typeof data.weight !== "number"){
  //   //   this.displayAlert("danger", "Enetr a valid weight", "Error");
      
  //   //   this.isLoading = false;
  //   //   return;
  //   // }

  //   this.signedOffJob.isConfirmed = !data.jobDetail.isConfirmed;
  //   console.log(this.signedOffJob);
  //   // return;
  //   this.apiService.saveJobItem(this.signedOffJob)
  //     .subscribe((res: ApiResponse) => {
  //       console.log(res);
  //       if (res.isSuccess == true)
  //       {
  //         this.displayAlert("success", "Successfully signed off", "Success");
  //         // this.getJobsByDate();
  //         this.getSignedOffJobsByDate();
          
  //         setTimeout(() => {
  //           this.hideAlert();
            
  //         }, 5000);
  //       }
  //       else {
  //         this.displayAlert("danger", "Error making sign off request "+ res.errorMessages.join(" "), "Error");
  //       }
  //       this.isLoading = false;
  //     },
  //   error => {
  //     console.log(error);
  //     this.displayAlert("danger", "Error making sign off request:\n" + error.error, "Error");
  //     this.isLoading = false;
  //   })

    
  // }

  // displayAlert(type: string, message: string, messageType: string) {
  //   this.messageType = messageType;
  //   this.alertType = type;
  //   this.alertMessage = message;
  // }

  // hideAlert() {
  //   this.alertMessage = "";
  //   this.alertType = "";
  //   this.messageType = "";
  // }

  // isDigit(data: string): boolean {
  //   return /^\d+$/.test(data);
  // }
}
