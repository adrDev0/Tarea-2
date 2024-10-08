import { Component, inject, Input, input } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { ICategory } from '../../../interfaces';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { CategoryService } from '../../../services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-catergory-list',
  standalone: true,
  imports: [
    ModalComponent,
    CategoryFormComponent
  ],
  templateUrl: './catergory-list.component.html',
  styleUrl: './catergory-list.component.scss'
})
export class CatergoryListComponent {
  @Input() itemList: ICategory[] = [];
  public selectedItem: ICategory = {};
  private categoryService = inject(CategoryService);
  public modalService = inject(NgbModal);

  showDetailModal(item: ICategory, modal:any) {
    this.selectedItem = {...item};
    modal.show();
  }

  onFormEventCalled(params: ICategory) {
    this.categoryService.save(params);
    this.modalService.dismissAll();
  }

  deleteCategory(item: ICategory) {
    this.categoryService.delete(item);
  }
}
