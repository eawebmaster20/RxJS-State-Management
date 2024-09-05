import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { VariablesService } from '../../services/variables.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { BehaviorSubject, find, findIndex, map, Observable, of } from 'rxjs';
import { ICart, IProduct } from '../../interfaces/product-item';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../services/apiservice/api.service';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule, 
    ModalComponent,
    MatBadgeModule, 
    MatButtonModule, 
    MatIconModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
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


}

