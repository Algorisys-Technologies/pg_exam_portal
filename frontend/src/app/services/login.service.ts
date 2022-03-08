import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  //get current user : which is loggedin
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //login user: set token in localStorage
  public loginUser(token: any) {
    localStorage.setItem("token", token);
    return true;
  }

  //isLogin: User is logged or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token");
    if (tokenStr == '' || tokenStr == null || tokenStr == undefined) {
      return false;
    } else {
      return true;
    }
  }

  //logout : remove token from localstorage
  public logout() {
    localStorage.clear();
    return true;
  }

  //get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //set user
  public setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  //get User
  public getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  //get user role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
