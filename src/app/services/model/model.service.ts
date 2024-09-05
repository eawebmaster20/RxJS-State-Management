import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { ICart, IProduct } from '../../interfaces/product-item';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  cartSubject = new BehaviorSubject<ICart[]>([]);
  cart$: Observable<ICart[]> = this.cartSubject.asObservable();
  constructor() { }

  loadHttpResponse(){
    
  }

 
  private get cartItems(): ICart[] {
    return this.cartSubject.getValue();
  }

  addItem(item: ICart) {
    const currentCart = this.cartItems;
    const itemIndex = currentCart.findIndex(i => i.id === item.id);
    
    if (itemIndex > -1) {
      currentCart[itemIndex].quantity += item.quantity;
    } else {
      currentCart.push(item);
    }

    this.cartSubject.next(currentCart);
  }

  removeItem(itemId: number) {
    const updatedCart = this.cartItems.filter(item => item.id !== itemId);
    this.cartSubject.next(updatedCart);
  }

  getTotalItems(): Observable<number> {
    return this.cart$.pipe(
      map((items: ICart[]) =>
        items.reduce((total, item) => total + item.quantity, 0)
      )
    );
  }
}
