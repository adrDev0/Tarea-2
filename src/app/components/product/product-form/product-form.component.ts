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
  @Output() categoryChange: EventEmitter<ICategory> = new EventEmitter<ICategory>();
  @Input() categories: ICategory[] = [];
  category: ICategory = {
    id: undefined,
    name: ""
  }
  @Input() categoryObtenida: ICategory = this.category;
  
  private categoryService = inject(CategoryService);


  onProductChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.category = this.categories.find(ct => (ct.id?.toString() ?? '') === selectedId) || {
      id: undefined,
      name: ""
    }
  }

  private emitCategory() {
    this.categoryChange.emit(this.category);
  }

  addEdit() {
    this.callParentEvent.emit(this.toUpdateProduct);
  }
}
