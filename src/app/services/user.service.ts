import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7194/api';
  constructor(private http: HttpClient, private router: Router) { }

  createUserAcct(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/useraccount/register/`, data)
  }

  loadUserRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/useraccount/roles`)
  }
}
