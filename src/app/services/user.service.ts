import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.baseUrl; 
  constructor(private http: HttpClient, private router: Router) { }

  createUserAcct(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/useraccount/register/`, data)
  }

  loadUserRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/useraccount/roles`)
  }
}
