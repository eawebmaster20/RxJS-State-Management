import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../../interfaces/product-item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  fetchProducts() {
    console.log('hello');
    return this.http.get<IProduct[]>('assets/data.json');
  }
}
