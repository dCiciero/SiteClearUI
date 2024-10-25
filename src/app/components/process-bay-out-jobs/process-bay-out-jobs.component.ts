import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-process-bay-out-jobs',
  templateUrl: './process-bay-out-jobs.component.html',
  styleUrl: './process-bay-out-jobs.component.scss'
})
export class ProcessBayOutJobsComponent implements OnInit {
  confirmedJobToSignOff: any; // JobDetails | undefined;
  showModal: boolean = false;
  isLoading: boolean = false;
  jobQuantities: any[]=[];
  repackagedJobs: any[]=[];
  filterText: any;
  displayRepackageModal: boolean = false;


  constructor(private apiService: AuthService, private toastService: ToastService) {}
  
  ngOnInit(): void {
    this.getRepackagedJobs();
  }

  getRepackagedJobs() {
    this.apiService.getRepackagedWastes().subscribe(
      (res:any) => {
        if (res.isSuccess)
        {
          this.repackagedJobs = res.result;
        }
        console.log(res);
      }
    ),
    (error: any) => {
      console.log(error)
    }
  }



  onFilterChange(text: string='') {
    const filteredItems = this.filterItems(this.repackagedJobs, text);
    console.log(filteredItems);
    this.repackagedJobs = filteredItems;
    
  }

  filterItems(items: any, filteredText: any): any [] {
    return items.filter((item: any) => {
      // Add your filtering logic here
      // For example, if you want to filter by job title:
      return item.itemDescription.toLowerCase().includes(filteredText.toLowerCase());
      
      // If you want to filter by multiple criteria, you can add more conditions:
      // return item.job.title.toLowerCase().includes(filterCriteria.toLowerCase()) ||
      //        item.jobDetail.description.toLowerCase().includes(filterCriteria.toLowerCase());
    });
  }

}
