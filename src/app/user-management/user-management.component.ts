import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {

  userForm: any;
  accountRoles: any;
  userRoleId: number=0;
  signInWithCode: boolean = false
  constructor(private fb: FormBuilder, 
    private userService: UserService, 
    private apiService: AuthService) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email]],
      signInCode: ['',],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: [''],
      phoneNumber: ['', [Validators.required,, Validators.pattern(/^\+?[0-9]{10,14}$/)]],
      roleId: ['', Validators.required],
      loginWithCode: [false],
      permissions: [[]]
    });

    console.log(this.userForm.value);
    this.getUserAcctRoles();
    this.getProcessingBays();
    
  }

  get loginOption() {
    return this.userForm.get('loginWithCode');
  }

  get loginEmail() {
    return this.userForm.get('email');
  }

  get loginCode() {
    return this.userForm.get('signInCode');
  }
  get roleId() {
    return this.userForm.get('roleId');
  }

  get permissions() {
    return this.userForm.get('permissions');
  }

  switchLoginOption() {
    if (this.loginOption.value) {
      this.loginEmail.value = "";
    } else {
      this.loginCode.value = "";
    }
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

    return !passwordValid ? { passwordStrength: true } : null;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      let reqParams = this.userForm.value
      let userParam = {
        "firstName": reqParams.firstName,
        "lastName": reqParams.lastName,
        "password": reqParams.password,
        // "email": reqParams.email,
        "loginWithCode": reqParams.loginWithCode,
        "loginParam": reqParams.loginWithCode ? reqParams.signInCode : reqParams.email ,
        "phoneNumber": reqParams.phoneNumber,
        "userRoleId": reqParams.roleId,
        // "signInCode": reqParams.signInCode
      }

      console.log(userParam);
      // return;
      this.userService.createUserAcct(userParam).subscribe(
        (res: any) => {
          console.log(res);
        },
        (error: any) => {
          console.log(error);
        },
        () => {
          console.log('Complete');
          
        }
      );
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.userForm.controls).forEach(key => {
        const control = this.userForm.get(key);
        control.markAsTouched();
      });
    }
  }

  getUserAcctRoles() {
    console.log('......................');
    this.userService.loadUserRoles().subscribe(res => {
      console.log(res);
      if (res.isSuccess)
      {
        this.accountRoles = res.result.filter((role: any) => role.name.toLowerCase() != 'super user');
        console.log(this.accountRoles);
        
        this.accountRoles.map((r:any) => { 
          r.name.toLowerCase() == 'user' ? this.userRoleId = r.id : null
        });
        console.log(this.userRoleId);
        
      }
      
    });
  }

  getProcessingBays() {
    this.apiService.getProcessingBays().subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      },
      () => {
        console.log("Complete");
      }
    )
  }
  getSelectedRole() {
    console.log(this.userForm.value);
    console.log(this.userForm);
  }

  getAssignedPermissions(data: any[]) {
    console.log(data);

    if (this.permissions.value.length > 0) {
      this.permissions.value.length = 0;
    }
    this.permissions.value.push(data);

    console.log(this.userForm.value);
    
  }

}
