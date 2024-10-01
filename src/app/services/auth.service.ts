import { computed, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiResponse } from '../models/api-response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7194/api';  // Replace with your API URL https://localhost:7194/api/useraccount/login
  public isAuth = new BehaviorSubject<boolean>(false);
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  // private currentUserSignal = signal<User | null>(null);
  // currentUser$ = computed(() => this.currentUserSignal());


  jobDetails: any;
  listOfConfirmedJobs: any;
  listOfHoldingBays: any[]=[];
  listOfProcssingBays: any[]=[];
  userRole = "";
  containerTypes: any[]=[];
  private loggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) { 
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
    

    // const storedUser = localStorage.getItem('currentUser');
    // if (storedUser) {
    //   this.currentUserSignal.set(JSON.parse(storedUser));
    // }
    
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login1(username: string, password: string): boolean {
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

  
  login(loginParam: string, password: string, loginWithCode: boolean): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ loginParam, password, loginWithCode });
    // this.isAuth.next(true);
    return this.http.post<any>(`${this.apiUrl}/useraccount/login`, body, { headers })
      .pipe(map(user => {
        console.log(user);
        
        if (user.isSuccess)
        {
          var loggedInUser = user.result
          console.log(loggedInUser);
          this.setUserDetail(loggedInUser);
          // localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(loggedInUser);
          this.loggedIn =true
          
        }
        return user;
      }));    
  }
  

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  logout() {
    this.clearUserDetails();
    this.currentUserSubject.next(null);
    // this.isAuth.next(false);
    this.router.navigate(['/login']);
  }

  setUserDetail(data: any) {
    localStorage.setItem('token', JSON.stringify(data.token));
    localStorage.setItem('email', JSON.stringify(data.email));
    localStorage.setItem('userId', JSON.stringify(data.id));
    localStorage.setItem('fullName', JSON.stringify(data.fullName));
    localStorage.setItem('roleId', JSON.stringify(data.roleId));
    localStorage.setItem('signInCOde', JSON.stringify(data.signInCOde));
    localStorage.setItem('currentUser', JSON.stringify(data));
  }

  clearUserDetails() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userId') 
    localStorage.removeItem('fullName');
    localStorage.removeItem('roleId');
    localStorage.removeItem('signInCOde');
    localStorage.removeItem('currentUser');
  }

  hasPermission(allowedRoles: string[]): boolean {
    const user = this.currentUserValue;
    // console.log(user);
    
    if (!user) return false;
    // return true;
    return allowedRoles.includes(user.role);
    // return user.roles.some(role => allowedRoles.includes(role));
  }


  // ************************************************************************************** //
  // login(username: string, password: string) {
  //   return this.http.post<User>('/api/login', { username, password }).pipe(
  //     tap(user => {
  //       localStorage.setItem('currentUser', JSON.stringify(user));
  //       this.currentUserSignal.set(user);
  //     })
  //   );
  // }

  // logout() {
  //   localStorage.removeItem('currentUser');
  //   this.currentUserSignal.set(null);
  // }

  // hasPermission(allowedRoles: string[]): boolean {
  //   const user = this.currentUserSignal();
  //   return user ? user.roles.some(role => allowedRoles.includes(role)) : false;
  // }
  // ************************************************************************************** //
  getChartInfo() {
    return this.http.get(`${this.apiUrl}sales`)
  }

  getAllWaste(): Observable<any> {
    return this.http.get(`${this.apiUrl}/wastes`);
  }

  createWaste(waste: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/wastes`, waste);
  }

  updateWaste(waste: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/wastes`, waste);
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
    return this.http.put(`${this.apiUrl}/wastes/updateJobItem`, jobDetail);
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

  getJobQuantitiesByInvoiceId(invoiceId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/wastes/JobItemQuantities/${invoiceId}`)
  }

  

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
}
