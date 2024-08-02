import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: any = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  // username: string = '';
  // password: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  onSubmit() {
    // this.authService.login(this.username, this.password).subscribe(
    console.log(this.loginForm.value);
    console.log(this.loginForm.get('username').value);
    //return;
    var isLoginSuccessful = this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value);
    if (isLoginSuccessful) {
      
      this.router.navigate(['/']);
    }
    else {
      this.errorMessage = 'Invalid username or password';
    }
    /*
    this.authService.login(this.loginForm.get('username'), this.loginForm.get('password')).subscribe(
      response => {
        // Handle successful login
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);  // Store user role
        this.router.navigate(['/']);
      },
      error => {
        // Handle login error
        this.errorMessage = 'Invalid username or password';
      }
    );
    */
  }
}
