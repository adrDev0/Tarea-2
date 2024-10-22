import { Component, inject, OnInit } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CatergoryListComponent } from "../../components/category/catergory-list/catergory-list.component";
import { CategoryFormComponent } from "../../components/category/category-form/category-form.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { ICategory } from '../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    LoaderComponent,
    CatergoryListComponent,
    CategoryFormComponent,
    ModalComponent,
    CommonModule
],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  public categoryService = inject(CategoryService);
  public modalService = inject(NgbModal);
  currentRole: string | undefined;

  constructor() {
    this.categoryService.getAll();
    let user = localStorage.getItem('auth_user');
    if(user) {
      this.currentRole = String(JSON.parse(user)?.role.name);
    }
  }
  
  onFormEventCalled(params: ICategory) {
    this.categoryService.save(params);
    this.modalService.dismissAll();
  }
}
