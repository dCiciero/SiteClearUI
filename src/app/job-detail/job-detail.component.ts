import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.scss'
})
export class JobDetailComponent implements OnInit {
  @Input() jobDetails: any;
  financialItems: any[]=[];
  financialItemForm: any;

  constructor(private fb: FormBuilder, private apiService: AuthService){
    this.financialItemForm = fb.group({
      description: [''],
      quantity: [''],
      weight: ['']
    });
    // this.financialItems = this.apiService.getJobDetails()
    console.log('Printing job details............');
    console.log(`${this.jobDetails}`);
    console.log(`${this.financialItems}`);
  }

  ngOnInit(): void {
    console.log('Printing job details in INIT ............');
    console.log(`${this.apiService.getJobDetails()}`);
  }

  getJobDetails(jobId: number) {
    this.apiService.getJobDetailById(jobId)
      .subscribe(data => {
        console.log(data);
      },
    error => {
      console.log(error);
    })
  }
}
