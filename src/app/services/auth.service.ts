import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7194/api';  // Replace with your API URL
  public isAuth = new BehaviorSubject<boolean>(false);
  jobDetails: any;
  listOfConfirmedJobs: any;
  listOfHoldingBays: any[]=[];
  listOfProcssingBays: any[]=[];
  messageType: string = "";
  alertType: string = "";
  alertMessage: string = "";
  containerTypes: any[]=[];

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): boolean {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ username, password });
    
    this.isAuth.next(true);

    // this.http.post(`${this.apiUrl}/login`, body, { headers }).subscribe( res=>{
    //   console.log(res);
    //   // localStorage.setItem('token', res.token);
    //   // localStorage.setItem('role', res.role);  // Store user role
    //   this.isAuth.next(true);
      
    // }, error => {
    //   return false;
    // });
    return true;
  }

  /*
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ username, password });
    this.isAuth.next(true);
    return this.http.post(`${this.apiUrl}/login`, body, { headers });

    
  }
  */

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.isAuth.next(false);
    this.router.navigate(['/login']);
  }

  getChartInfo() {
    return this.http.get(`${this.apiUrl}sales`)
  }

  getAllWaste(): Observable<any> {
    return this.http.get(`${this.apiUrl}/wastes`);
  }

  createWaste(waste: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/wastes`, waste);
  }

  getJobsByDate(reqParams: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/wastes/jobs`, {params: reqParams});
  }

   // This is for retrieving the job details from from client by calling API
  getJobDetailById(requestParams: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/wastes/jobDetailsById`, {params: requestParams});
  }

   // This is for saving the job detail when the signoff button is clicked
  saveJobItem(jobDetail: any): Observable<any>
  {
    return this.http.post(`${this.apiUrl}/wastes/saveJobItem`, jobDetail);
  }

  updateJobItem(jobDetail: any): Observable<any>
  {
    return this.http.post(`${this.apiUrl}/wastes/updateJobItem`, jobDetail);
  }

  // This is for retrieving the job details from jobDetail Component
  getJobDetails(): Observable<any>  {
    return this.http.get(`${this.apiUrl}/wastes/jobDetails`);
  }

  getOutBays(): Observable<any> {
    return this.http.get(`${this.apiUrl}/wastes/GetOutBays`);
  }

  getProcessingBays(): Observable<any> {
    return this.http.get(`${this.apiUrl}/wastes/AllProcessingBays`);
  }

  loadOutBays() {
    this.getOutBays().subscribe(res => {
      if (res.isSuccess) {
        this.listOfHoldingBays = res.result
        console.log(this.listOfHoldingBays);
        return this.listOfHoldingBays
      }
      else{
        return this.listOfHoldingBays
      }
    })
    return this.listOfHoldingBays
  }

  getContainerTypes(): Observable<any>  {
    return this.http.get(`${this.apiUrl}/wastes/AllContainerTypes`);
  }

  getWasteStreams(): Observable<any> {
    return this.http.get(`${this.apiUrl}/wastes/AllWasteStreams`);
  }

  // This method is called to save each job item quantity with their weights
  saveJobQuantity(param: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/wastes/JobItemQuantity`, param);
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
