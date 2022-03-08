import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) { }

  //load all the categories
  public getCategories() {
    return this._http.get(`${baseUrl}/category/`);
  }

  //load one single categories
  public getCategory(cid:any){
    return this._http.get(`${baseUrl}/category/${cid}`);
  }

  //add new category
  public addCategory(category: any) {
    return this._http.post(`${baseUrl}/category/`, category);
  }

  deleteCategory(id: string){
    let url=`${baseUrl}/category/${id}`;
    return this._http.delete(url)
  }

}
