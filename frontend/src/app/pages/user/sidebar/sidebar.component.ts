import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories: any[] = [];

  constructor(
    private _categoryService: CategoryService,
  ) { }

  ngOnInit(): void {

    this._categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
    }, () => {
      Swal.fire('Error!!', 'Error while loading categories from server!!', 'error');
    })
  }

}
