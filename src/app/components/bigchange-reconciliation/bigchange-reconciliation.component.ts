import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-bigchange-reconciliation',
  templateUrl: './bigchange-reconciliation.component.html',
  styleUrl: './bigchange-reconciliation.component.scss'
})
export class BigchangeReconciliationComponent implements OnInit {

  filterText: string = '';
  weightedJobs: any[]=[];
  weightedJobDetail: any[]=[];
  viewDetails: boolean = false;
  btnText = 'Show Details';
  lastCheckJobId = 0;

  constructor(private apiService: AuthService, private toastService: ToastService) {}
  ngOnInit(): void {
    this.getCompletedWeightedJobs();
  }

  

  getCompletedWeightedJobs() {
    this.apiService.getCompletedWeightedJobs().subscribe(
      (res: any) => {
        console.log(res);
        if (res.isSuccess) {
          this.weightedJobs = res.result;
        }
        
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  viewJobDetails(data:any) {
    console.log(data)
    this.viewDetails = !this.viewDetails;
    //this.btnText = !this.viewDetails && this.lastCheckJobId == data.jobId ? 'Show Details' : 'Hide Details'
    if (this.lastCheckJobId !== data.jobId) {
      this.lastCheckJobId = data.jobId;
      this.getDetailsById(this.lastCheckJobId);
    } else {

    }
    
  }

  hideJobDetails() {
    this.viewDetails = !this.viewDetails;
  }

  postToBigChange(data: any) {
    console.log(data);
    let params: any[] = [];
    const action = "Jobsaveworksheetanswer";
    
    if (this.lastCheckJobId !== data.jobId) {
      this.lastCheckJobId = data.jobId;
      this.getDetailsById(this.lastCheckJobId);
    } else {
      console.log(this.weightedJobDetail);
    }
    this.weightedJobDetail.forEach( rec => {
      let param = {
        'action': action,
        'itemDescription': rec.itemDescription,
        'itemWeight': rec.totalWeight,
        'jobId': rec.jobId
      };
      params.push(param)
    });

    console.log(params);
    this.apiService.postWorksheetData(params).subscribe(
      (res:any) => {
        console.log(res);
        if (res === true){
          this.toastService.showSuccess("Record posted successfully");
        } else{
          this.toastService.showError("Error posting record")
        }
      },
      (error: any) => {
        console.log(error.error)
      }
    )
    
  }

  getDetailsById(jobId: any) {
    this.apiService.getCompletedWeightedJobsByJobId(jobId).subscribe(
      (res:any) => {
        console.log(res);
        if (res.isSuccess) {
          this.weightedJobDetail = res.result
        }
      },
      (error: any)=> {
        console.log(error);
        
      }
    )
  }
}


