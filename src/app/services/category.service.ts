import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { ICategory, IResponse } from '../interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<ICategory>{
  protected override source: string = 'category';
  private itemListSignal = signal<ICategory[]>([]);

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

  public getAllList(): Observable<ICategory[]> {
    return this.findAll().pipe(
      map((response: IResponse<ICategory[]>) => response.data)
    );
  }

  public save(item: ICategory) {
    this.add(item).subscribe({
      next: (response: any) => {
        this.itemListSignal.update( (category: ICategory[]) => [response, ...category]);
      },
      error: (error : any) => {
        console.log('error', error);
      }
    });
  }

  public update(item: ICategory) {
    this.edit(item.id, item).subscribe({
      next: () => {
        const updatedItems = this.itemListSignal().map(category => category.id === item.id ? item: category);
        this.itemListSignal.set(updatedItems);
      },
      error: (error : any) => {
        console.log('error', error);
      }
    });
  }

  public delete(item: ICategory) {
    this.del(item.id).subscribe({
      next: () => {
        const updatedItems = this.itemListSignal().filter((category: ICategory) => category.id != item.id);
        this.itemListSignal.set(updatedItems);
      },
      error: (error : any) => {
        console.log('error', error);
      }
    });
  }
}