import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { IProduct, ICategory } from '../../../interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { CategorySelectComponent } from "../../category-select/category-select.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CategorySelectComponent
],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  public productService = inject(ProductService);
  public modalService = inject(NgbModal);

  categories: ICategory[] = [];
  category: ICategory = {
    id: 0,
    name: ""
  }; 

  ngOnInit() {
    this.categoryService.getAll();
  }

  onFormEventCalled(params: IProduct) {
    this.productService.save(params);
    this.modalService.dismissAll();
  }

  onCategoryChange(params: ICategory) {
    console.log("onCategoriesChange", params)
    this.toUpdateProduct.category = params;
  }

  categoryService = inject(CategoryService);
  @Input() title: string = "";
  @Input() toUpdateProduct: IProduct = {};
  @Output() callParentEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  addEdit() {
    this.callParentEvent.emit(this.toUpdateProduct);
  }
  
}
