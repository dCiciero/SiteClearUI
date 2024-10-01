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
    email: [''],
    signInCode: [''],
    loginOption: [false],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  // yardSignIn: boolean = false;
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
      console.log(this.returnUrl);
      
    }

  onSubmit() {
    // this.authService.login(this.username, this.password).subscribe(
    console.log(this.loginForm.value);
    console.log(this.loginForm.get('email').value);
    // this.router.navigate([this.returnUrl]);
    // return;
    let signInOption = this.loginOption.value;
    let loginParam = !signInOption ? this.loginForm.get('email').value : this.loginForm.get('signInCode').value
    this.authService.login(loginParam, this.loginForm.get('password').value, this.loginOption.value)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          if (data.isSuccess){
            console.log(data.result);
            console.log(localStorage.getItem('currentUser'));
            
            this.router.navigate([this.returnUrl]);
            this.toastService.showSuccess("Login Successful");
          } else {
            this.toastService.showInfo(data.errorMessages.join(", ") );
            this.errorMessage = data.errorMessages.join(", ")
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

    // ****************************************************************//
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

  get loginOption() {
    return this.loginForm.get('loginOption')
  }
  get loginEmail() {
    return this.loginForm.get('email')
  }

  get loginCode() {
    return this.loginForm.get('signInCode')
  }

  signInOption() {
    console.log(this.loginForm.value);
    console.log(this.loginOption.value);
    if (this.loginOption.value) {
      this.loginEmail.value = '';
    } else {
      this.loginCode.value = '';
    }
  }
}
