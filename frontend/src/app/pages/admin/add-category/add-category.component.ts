import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  addCategory!: FormGroup;

  constructor(private _fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _categoryService: CategoryService,
    ) { }

  ngOnInit(): void {
    this.AddCategoryForm();
  }

  AddCategoryForm() {
    this.addCategory = this._fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  get title() {
    return this.addCategory.get("title");
  }

  get description() {
    return this.addCategory.get("description");
  }

  onSubmit() {
    this.titleValid() && this.descriptionValid() && this.onSubmitAddCategory();
  }

  onSubmitAddCategory() {
    let formValue = this.addCategory.getRawValue();
    this._categoryService.addCategory(formValue).subscribe(() => {
      this.clear();
      Swal.fire("Success !!", 'Category added successfully', 'success');
    }, () => {
      Swal.fire("Error !!", "Error while adding category", "error");
    })
  }

  titleValid() {
    if (this.addCategory.controls['title'].value.trim() == '') {
      this.snackBar.open('Title is not empty!!', 'ok', {
        duration: 3000
      })
      return false;
    }
    return true;
  }

  descriptionValid() {
    if (this.addCategory.controls['description'].value.trim() == '') {
      this.snackBar.open('Description is not empty!!', 'ok', {
        duration: 3000
      })
      return false;
    }
    return true;
  }

  clear() {
    this.addCategory.reset();
      Object.keys(this.addCategory.controls).forEach(key => {
        this.addCategory.get(key)?.setErrors(null);
      })
  }

}
