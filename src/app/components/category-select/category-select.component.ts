import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICategory } from '../../interfaces';

@Component({
  selector: 'app-category-select',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './category-select.component.html',
  styleUrl: './category-select.component.scss'
})
export class CategorySelectComponent {

  category: ICategory = {
    id: undefined,
    name: undefined
  }

  @Input() categories: ICategory[] = [];

  @Output() categoryChange: EventEmitter<ICategory> = new EventEmitter<ICategory>();

  @Input() categoryObtenida: ICategory = this.category;

  categoryInvalid = false;
  categoryTouched = false;
  

  onCategoryChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.category = this.categories.find(ct => (ct.id?.toString() ?? '') === selectedId) || {
      id: undefined,
      name: ""
    };
    this.categoryTouched = true;
    this.categoryInvalid = !this.category.id;
    this.emitCategory();
  }


  private emitCategory(){
    this.categoryChange.emit(this.category);
  }


}
