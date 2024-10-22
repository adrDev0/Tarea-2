import { Component, inject, Input } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { IProduct } from '../../../interfaces';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductService } from '../../../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ModalComponent,
    ProductFormComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() itemList: IProduct[] = [];
  public selectedItem: IProduct = {};
  private productService = inject(ProductService);
  public modalService = inject(NgbModal);
  currentRole: string | undefined;

  constructor() {
    let user = localStorage.getItem('auth_user');
    if(user) {
      this.currentRole = String(JSON.parse(user)?.role.name);
    }
  }

  showDetailModal(item: IProduct, modal:any) {
    this.selectedItem = {...item};
    modal.show();
  }

  onFormEventCalled(params: IProduct) {
    this.productService.save(params);
    location.reload();
    this.modalService.dismissAll();
  }

  deleteProduct(item: IProduct) {
    this.productService.delete(item);
  }
}
