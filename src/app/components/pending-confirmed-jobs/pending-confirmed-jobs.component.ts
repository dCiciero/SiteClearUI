import { Component, OnInit } from '@angular/core';
import { JobDetails } from '../../models/job-details.model';
import { BayOptions } from '../../models/bay-options.model';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-pending-confirmed-jobs',
  templateUrl: './pending-confirmed-jobs.component.html',
  styleUrl: './pending-confirmed-jobs.component.scss'
})
export class PendingConfirmedJobsComponent implements OnInit {
  //paginatedItems: { job: Jobs, jobDetail: JobDetails }[] = [];;
  signOffForm: any;
  paginatedItems: any[] = [];
  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  alertMessage: string = "";
  alertType: string = "";
  messageType: string = "";
  financialItems: JobDetails[]=[];
  confirmedJobs: JobDetails[]=[];
  confirmedJobToSignOff: any; // JobDetails | undefined;
  showModal: boolean = false;
  isLoading: boolean = false;
  bayOptions: BayOptions[] = [{id:1, name:'Processing Bay'}, {id:2, name:'Holding Bay'}]
  // bayOptions: string[] =  ["{1: 'Processing Bay'}", "{2: 'Holding Bay'}"];
  selectedOption: string = this.bayOptions[0].name;
  outBays: any[] = [];
  listOfProcessingBays: any[]=[];
  listOfHoldingingBays: any[]=[];
  // selectedBayOption: string = this.bayOptions[0];

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

    this.getHoldingBays();
    this.getProcessingingBays();
    this.getConfirmedJobs();
  }

  getFormControlValue(controlName: string): any {
    return this.signOffForm.get(controlName)?.value;
  }
  getConfirmedJobs() {
    this.apiService.getPendingConfirmedJobs()
      .subscribe((res: any) => {
        console.log(res);
        this.confirmedJobs = res.result;
      },error => {
        console.log("Error getting signed off data");
      })
  }

  getHoldingBays() {
    this.apiService.getOutBays().subscribe(res => {
      if (res.isSuccess) {
        this.listOfHoldingingBays = res.result
      }
    })
  }

  getProcessingingBays() {
    this.apiService.getProcessingBays().subscribe(res => {
      if (res.isSuccess) {
        this.listOfProcessingBays = res.result
      }
    })
  }

  // This method gets the value (from radio btn) of the Bay to send to when signing off
  getSelectedBay(selectedBay: string) {
    console.log(selectedBay);
    this.signOffForm.get('selectedBayId').reset();
    if (selectedBay.toLowerCase() === "holding bay") {
      this.signOffForm.get('selectedProcessingBay').reset();
    } else {
      this.signOffForm.get('selectedHoldingBay').reset();
      this.signOffForm.get('netWeight').reset();
    }
    console.log(this.signOffForm.value);
    
  }
  // If Holding Bay is selected, This method gets the selected holding Bay to receive the item
  getSelectedHoldingBay(evt: any) {
    // console.log(evt);
    console.log(evt.target.value);
    // console.log(evt.target.innerText);
    this.signOffForm.get('selectedBayId').value = evt.target.value;
    console.log(this.signOffForm.value)
  }

  // If Processing Bay is selected, This method gets the selected processing Bay to receive the item
  getSelectedProcessingBay(evt: any) {
    console.log(evt.target.value);
    this.signOffForm.get('selectedBayId').value = evt.target.value;
    console.log(this.signOffForm.value)
  }


  //This methods simply calls the endpoint to update the ProcessingBayId of the FinancialLineItems
  processTransfer() {
    console.log(this.signOffForm.value);
    // this.confirmedJobToSignOff.isSignedOff=true;
    this.confirmedJobToSignOff.processingBayId=this.signOffForm.get('selectedBayId')?.value;
    var updatedJob = this.confirmedJobToSignOff;
    console.log(this.confirmedJobToSignOff)

    this.apiService.updateJobItem(updatedJob).subscribe(
      (res) => {
        console.log(res)
        if (res.isSuccess){
          this.toastService.showSuccess('Operation succesful');
          var modalClsBtn = document.querySelector('#btnCloseTransferModal') as HTMLElement;
          if (modalClsBtn) {
            console.log(modalClsBtn);
            modalClsBtn.click();
          }
        }
      },
      (error) => {
        console.log(error.error);
        this.toastService.showError('Operation not succesful');    
      },
      () => {

      }
    )
  }

  getDataToSignOff(data: any) {
    this.confirmedJobToSignOff = data
    console.log(data)
  }


  updatePaginatedItems(): void {
    console.log("Getting paginated items");
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedItems = this.confirmedJobs.slice(startIndex, startIndex + this.pageSize);
    // return this.jobs.slice(startIndex, endIndex);
    //this.paginatedItems = this.jobs.slice(startIndex, startIndex + this.pageSize);
  }

  getTotalPages(): number {
    // const totalItems = this.jobs.reduce((count, parent) => count + parent.jobDetails.length, 0);
    // return Math.ceil(totalItems / this.pageSize);
    return Math.ceil(this.confirmedJobs.length / this.pageSize);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedItems();
  }

  
}
