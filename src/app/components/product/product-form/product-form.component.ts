import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { IProduct, ICategory } from '../../../interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  @Input() title: string = "";
  @Input() toUpdateProduct: IProduct = {};
  @Output() callParentEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  public categories: ICategory[] = [];
  
  private categoryService = inject(CategoryService);

  addEdit() {
    this.callParentEvent.emit(this.toUpdateProduct);
  }
}
