import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss'
})
export class TopNavComponent implements OnInit {
  isLoggedIn: boolean = false;
  userRole: string | null = null;
  loggedInUser: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    // this.isLoggedIn = this.authService.isLoggedIn();

  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userRole = this.authService.getUserRole();
    console.log(`logged In: ${this.isLoggedIn}`);
    this.loggedInUser = localStorage.getItem('fullName'); //?.replace(/"/g, '',);
    
  }

  logout() {
    this.authService.logout();
    // this.isLoggedIn = false;
    console.log( this.authService.isLoggedIn());
    
    this.userRole = null;
    this.router.navigate(['/login']);
  }

}
