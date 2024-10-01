import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit {
  auth: any;
  constructor(private authService: AuthService) {
    
  }
  ngOnInit(): void {
    this.auth = this.authService;
  }
}
