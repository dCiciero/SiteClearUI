import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: any = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  returnUrl: string = "/";
  // username: string = '';
  // password: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

  onSubmit() {
    // this.authService.login(this.username, this.password).subscribe(
    console.log(this.loginForm.value);
    console.log(this.loginForm.get('email').value);
    //return;
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if (data.isSuccess){
            this.router.navigate([this.returnUrl]);
            this.toastService.showSuccess("Login Successful");
          } else {
            this.toastService.showInfo(data.errorMessages.join(", ") );
          }
          
          
        },
        error => {
          console.log("Login failed", error);
          this.toastService.showError("Login failed");
          
        }
      );
    // var isLoginSuccessful = this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value);
    // if (isLoginSuccessful) {
      
    //   this.router.navigate(['/']);
    // }
    // else {
    //   this.errorMessage = 'Invalid username or password';
    // }
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
