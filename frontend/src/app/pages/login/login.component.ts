import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin!: FormGroup;

  constructor(private _fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.UserLoginForm();
  }

  UserLoginForm() {
    this.userLogin = this._fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  get username() {
    return this.userLogin?.get("username");
  }

  get password() {
    return this.userLogin?.get("password");
  }

  onSubmit() {
    this.usernameValid() && this.passwordValid() && this.onSubmitLogin();
  }

  clear() {
    this.userLogin.reset();
    Object.keys(this.userLogin.controls).forEach(key => {
      this.userLogin.get(key)?.setErrors(null);
    })
  }

  onSubmitLogin() {
    let formValue = this.userLogin.getRawValue();
    this.loginService.generateToken(formValue).subscribe(
      (data: any) => {
        this.clear();
        Swal.fire({
          title: 'Login successfully!!',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        })
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);
          if (this.loginService.getUserRole() == 'ADMIN') {
            this.loginService.loginStatusSubject.next(true);
            this.router.navigate(['admin']);
          } else if (this.loginService.getUserRole() == 'NORMAL') {
            this.loginService.loginStatusSubject.next(true);
            this.router.navigate(['user-dashboard/0']);
          } else { this.loginService.logout(); }
        });
      }, (error: any) => {
        if (error.status == 404) {
          this.snackBar.open("User is not exist!", "ok", { duration: 3000 })
        } else {
          this.snackBar.open("something went wrong!", "ok", { duration: 3000 })
        }
      }
    )
  }

  usernameValid() {
    if ((this.userLogin.controls['username'].value).trim() == '') {
      this.snackBar.open('Username is not empty!!', 'ok', {
        duration: 3000, verticalPosition: 'bottom', horizontalPosition: 'center'
      })
      return false;
    }
    return true
  }

  passwordValid() {
    if ((this.userLogin.controls['password'].value).trim() == '') {
      this.snackBar.open('Password is not empty!!', 'ok', {
        duration: 3000, verticalPosition: 'bottom', horizontalPosition: 'center'
      })
      return false;
    }
    return true;
  }
}
