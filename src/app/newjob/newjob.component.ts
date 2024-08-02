import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Jobs } from '../models/jobs.model';

@Component({
  selector: 'app-newjob',
  templateUrl: './newjob.component.html',
  styleUrl: './newjob.component.scss'
})
export class NewjobComponent {
  form: any;
  listOfJobs: any[]=[];
  outBays: any[] = [];
  alertMessage: string = "";
  alertType: string = "";
  messageType: string = "";
  isLoading = false;
  displayJobs: boolean = false;


  constructor(private fb: FormBuilder, private apiService: AuthService  ){
    this.form = fb.group({
      wasteStream: ['', Validators.required],
      weight: ['', Validators.required],
      // itemDescription: ['', Validators.required],
      packageType: ['', Validators.required],
      outBayId: ['', Validators.required],
    });

    this.getAllJobs();
    this.loadOutBays();
    console.log(apiService.loadOutBays());
    console.log(apiService.listOfHoldingBays);
  }

  getAllJobs() {
    this.apiService.getAllWaste().subscribe(res => {
      if (res.isSuccess) {
        this.listOfJobs = res.result;
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
    return;
    if (!this.form.valid)
    {
      this.displayAlert("danger", "Please enter all entries", "Error");
      return;
    }
    const request = this.form.value;
    // request.itemDescription = "Waste stream creation";
    this.apiService.createWaste(request).subscribe(res => {
      console.log(res);
      if (res.isSuccess){
        this.displayAlert("success", "Job Created Successfully", "Success");
        this.getAllJobs();

        this.form.reset();

        setTimeout(() => {
          this.hideAlert();
          
        }, 5000);
      }
      else {
        this.displayAlert("danger", "Error creating job "+ res.errorMessages.join(" "), "Error");
      }
    }, error => {
      console.log(error);
      this.displayAlert("danger", "Error creating job:\n" + error.error, "Error");
      this.isLoading = false;
    })
  }

  loadOutBays() {
    this.apiService.getOutBays().subscribe(res => {
      if (res.isSuccess) {
        this.outBays = res.result
      }
    })
  }

  toggleDisplayJobs() {
    this.displayJobs = !this.displayJobs;
  }

  selectedBay(evt: any) {
    console.log(evt.target.value);
    console.log(evt.target.innerText);
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
}
