import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userRegister!: FormGroup;

  constructor(private _fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.UserRegisterForm();
  }

  UserRegisterForm() {
    this.userRegister = this._fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10),
      Validators.maxLength(10), Validators.pattern('[0-9]*')]]
    });
  }

  get username() {
    return this.userRegister?.get("username");
  }

  get email() {
    return this.userRegister?.get("email");
  }

  get password() {
    return this.userRegister?.get("password");
  }

  get confirmpassword() {
    return this.userRegister?.get("confirmpassword");
  }

  get firstName() {
    return this.userRegister?.get("firstName");
  }

  get lastName() {
    return this.userRegister?.get("lastName");
  }

  get phone() {
    return this.userRegister?.get("phone");
  }

  onSubmit() {
    this.usernameValid() && this.passwordValid() && this.onSubmitRegister();
  }

  onSubmitRegister() {
    let formValue = this.userRegister?.getRawValue();
    if (formValue.password === formValue.confirmpassword) {
      console.log(formValue);
      this.userService.addUser(formValue).subscribe(
        (data: any) => {
          console.log("This is signup data:", data);
          this.clear();
          Swal.fire({
            title: 'Register successfully!!',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          })
        },
        (error: any) => {
          console.log("This is error in signup data:", error);
          if (error.status === 403) {
            this.snackBar.open('User already exists, please use another username!!', 'ok', {
              duration: 3000, verticalPosition: 'bottom', horizontalPosition: 'center'
            })
          } else {
            this.snackBar.open('Something went wrong!!', 'ok', {
              duration: 3000, verticalPosition: 'bottom', horizontalPosition: 'center'
            })
          }
        });
    } else {
      this.snackBar.open("Please write Password and Confirm password same!", 'ok', {
        duration: 3000, verticalPosition: 'bottom'
      })
    }
  }

  clear() {
    this.userRegister.reset();
    Object.keys(this.userRegister.controls).forEach(key => {
      this.userRegister.get(key)?.setErrors(null);
    })
  }

  usernameValid() {
    if ((this.userRegister.controls['username'].value).trim() == '') {
      this.snackBar.open('Username is not empty!!', 'ok', {
        duration: 3000, verticalPosition: 'bottom', horizontalPosition: 'center'
      })
      return false;
    }
    return true;
  }

  passwordValid() {
    if ((this.userRegister.controls['password'].value).trim() == '') {
      this.snackBar.open('Password is not empty!!', 'ok', {
        duration: 3000, verticalPosition: 'bottom', horizontalPosition: 'center'
      })
      return false;
    }
    return true;
  }



}
