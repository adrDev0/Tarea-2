import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategory } from '../../../interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from '../../../pages/category/category.component';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  @Input() title: string = "";
  @Input() toUpdateCategory: ICategory = {};
  @Output() callParentEvent: EventEmitter<ICategory> = new EventEmitter<ICategory>();

  addEdit() {
    this.callParentEvent.emit(this.toUpdateCategory);
  }
}
