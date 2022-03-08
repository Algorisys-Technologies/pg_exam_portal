import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories: any[] = [];

  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory() {
    this._categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
    },
      (error) => {
        console.log(error);
        Swal.fire("Error!", "Error in loading categories", 'error');
      })
  }

  removeCategory(id: any) {
    Swal.fire({
      icon: 'info',
      title: 'Do you want to delete Category?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._categoryService.deleteCategory(id).subscribe(() => {
          this.categories = this.categories.filter((category) => category.cid != id)
          Swal.fire("Success", "Category Deleted Successfully", 'success');
        }, () => {
          Swal.fire("Error", "Error in deleting category", 'error');
        })
      }
    })
  }

}
