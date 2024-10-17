import { Component, inject, OnInit } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ProductListComponent } from "../../components/product/product-list/product-list.component";
import { ProductFormComponent } from "../../components/product/product-form/product-form.component";
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ICategory, IProduct } from '../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/modal/modal.component';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    LoaderComponent,
    ProductListComponent,
    ProductFormComponent,
    ModalComponent,
    CommonModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  public productService = inject(ProductService);
  public modalService = inject(NgbModal);
  public categoryService = inject(CategoryService);

  categoriesList: ICategory = {
    id: 0,
    name: ''
  }

  constructor() {
    this.productService.getAll();
  }
  
  onFormEventCalled(params: IProduct) {
    this.productService.save(params);
    this.modalService.dismissAll();
  }

  onCategoryChange(params: ICategory) {
    console.log("onCategoriesChange", params)
  }
}
