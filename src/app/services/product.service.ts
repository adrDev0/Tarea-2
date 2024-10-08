import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IProduct } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<IProduct> {
  protected override source: string = 'products';
  private itemListSignal = signal<IProduct[]>([]);

  get items$() {
    return this.itemListSignal;
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.itemListSignal.set(response);
      },
      error: (error : any) => {
        console.log('error', error);
      }
    });
  }

  public save(item: IProduct) {
    this.add(item).subscribe({
      next: (response: any) => {
        this.itemListSignal.update( (products: IProduct[]) => [response, ...products]);
      },
      error: (error : any) => {
        console.log('error', error);
      }
    });
  }

  public update(item: IProduct) {
    this.edit(item.id, item).subscribe({
      next: () => {
        const updatedItems = this.itemListSignal().map(product => product.id === item.id ? item : product);
        this.itemListSignal.set(updatedItems);
      },
      error: (error : any) => {
        console.log('error', error);
      }
    });
  }

  public delete(item: IProduct) {
    this.del(item.id).subscribe({
      next: () => {
        const updatedItems = this.itemListSignal().filter((product: IProduct) => product.id != item.id);
        this.itemListSignal.set(updatedItems);
      },
      error: (error : any) => {
        console.log('error', error);
      }
    });
  }
}
