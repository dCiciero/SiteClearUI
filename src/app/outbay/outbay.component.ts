import { Component, OnInit } from '@angular/core';
import { JobDetails } from '../models/job-details.model';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-outbay',
  templateUrl: './outbay.component.html',
  styleUrl: './outbay.component.scss'
})
export class OutbayComponent implements OnInit {

  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  outBayJobs: JobDetails[]=[];
  paginatedItems: JobDetails[]=[];
  confirmedJobToSignOff: any; // JobDetails | undefined;
  showModal: boolean = false;
  isLoading: boolean = false;
  jobQuantities: any[]=[];
  filteredJobs: any[]=[];
  listOfJobs: any[]=[];
  filterText: any;
  constructor(private fb: FormBuilder, private apiService: AuthService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.onFilterChange();
    this.getAllJobsForDisposal();

  }

  
  getAllJobsForDisposal() {
    this.apiService.getAllWaste().subscribe(res => {
      if (res.isSuccess) {
        this.listOfJobs = res.result.filter((rec: any) => {
          return rec.isSentForDisposal
        });

        this.filteredJobs = this.listOfJobs;
        console.log(this.listOfJobs);
        
      }
    }, error => {
      console.log("Error loading job list: \n" + error.error);
    })
  }
  
  onFilterChange(text: string='') {
    const filteredItems = this.filterItems(this.listOfJobs, text);
    console.log(filteredItems);
    this.filteredJobs = filteredItems;
    
  }

  filterItems(items: any, filteredText: any): any [] {
    return items.filter((item: any) => {
      
      return item.outBay?.name.toLowerCase().includes(filteredText.toLowerCase());
      
    });
  }


  updatePaginatedItems(): void {
    console.log("Getting paginated items");
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedItems = this.outBayJobs.slice(startIndex, startIndex + this.pageSize);
    // return this.jobs.slice(startIndex, endIndex);
    //this.paginatedItems = this.jobs.slice(startIndex, startIndex + this.pageSize);
  }

  getTotalPages(): number {
    // const totalItems = this.jobs.reduce((count, parent) => count + parent.jobDetails.length, 0);
    // return Math.ceil(totalItems / this.pageSize);
    return Math.ceil(this.outBayJobs.length / this.pageSize);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedItems();
  }

  confirmDisposal(data: any) {
    data.isDisposed = true;
    console.log(data);
    this.apiService.updateWaste(data).subscribe(res => {
      if (res.isSuccess) {
        this.toastService.showSuccess("Operation Successful");
        this.getAllJobsForDisposal();
      }

      else {
        this.toastService.showError("Operation Not Successful");
      }
    }, error => {
      console.log("Error sending for disposal: \n" + error.error);
      this.toastService.showError("Error Occured");
    })
  }

  // This method is for returning jobs back to Holding bay
  returnToHolding(data: any) {
    data.isSentForDisposal = false;
    console.log(data);
    this.apiService.updateWaste(data).subscribe(res => {
      if (res.isSuccess) {
        this.toastService.showSuccess("Operation Successful");
        this.getAllJobsForDisposal();
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
