import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { ICart, IProduct } from '../../interfaces/product-item';
import { VariablesService } from '../variables.service';
import { ApiService } from '../apiservice/api.service';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  cart$ = new BehaviorSubject<ICart[]>([]);
  products!:Observable<IProduct[]>
  constructor(
    public variables: VariablesService,
    private apiService : ApiService,
  ) {
    this.apiService.fetchProducts().subscribe({
      next:(prod)=>{
        this.products = of(prod);
        console.log(this.products);
      },
      error:(err)=>console.error(err),
      complete:()=>console.log('complete')
    })

    this.cart$.subscribe({
      next:(prod)=>console.log(prod),
      error:(err)=>console.error(err),
      complete:()=>console.log('complete')
    })

  }
  toggleDialog(){
    this.variables.showModal = !this.variables.showModal
  }

  addToCart(product:IProduct) {
    let item = {...product, quantity:1}
    this.cart$.next([...this.cart$.getValue(), item])
  }
  isInCart(product: IProduct) {
    let item = {...product, quantity:1}
    return of(this.cart$.getValue().some(item=>item.id === product.id))
  }
  removeFromCart(productId:number){
    let cartItems = this.cart$.getValue()
    cartItems = cartItems.filter(item=>item.id !== productId)
    this.cart$.next(cartItems)
  }

  getTotalItems(): Observable<number> {
    return this.cart$.pipe(
      map((items: ICart[]) =>
        items.reduce((total, item) => total + item.quantity, 0)
      )
    );
  }
}
