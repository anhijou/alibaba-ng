import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems!:Cart[];
  constructor() { }

  getCart(){
    let cartdata = localStorage.getItem('cart');
    if(cartdata){
      return this.cartItems = JSON.parse(cartdata);
    }
  }

  addToCart(product:Product){
   let item = this.cartItems.find(item => item.product.id===product.id);
   if(item){
    item.quantity++;
   }else{
    this.cartItems.push({product:product,quantity:1});
   }
   localStorage.setItem('cart',JSON.stringify(this.cartItems));
  }

  removeProduct(product:Cart){
    let itemIndex = this.cartItems.findIndex(item => item.product.id===product.product.id);
    if(itemIndex > -1){
        this.cartItems.splice(itemIndex,1);
        localStorage.setItem('cart',JSON.stringify(this.cartItems));

    }
  }
  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  incrementQuantity(item: Cart) {
    item.quantity++;
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  decrementQuantity(item: Cart) {
    if (item.quantity > 1) {
      item.quantity--;
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }


}
//////////
import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems= 'http://localhost:3000/Cart';
  constructor(private http:HttpClient) { }

////////////////////////////
  getCartApi(): Observable<Cart[]>{
    return this.http.get<Cart[]>(this.cartItems);
  }
  
  getCart(){
    let cartdata = localStorage.getItem('cart');
    if(cartdata){
      return this.cartItems = JSON.parse(cartdata);
    }
  }
//////////////////////////////////////
  addToCart(product:Product){
     
    const url = `${this.cartItems}/${product.id}`;
   let item = this.http.get<Product>(url);
   if(item){
    item.quantity++;
   }else{
    this.http.post<Product>(this.cartItems, product);   }
   
  }
/////////////////////////////////////////////
  removeProduct(product:Cart){
    let itemIndex = this.cartItems.findIndex(item => item.product.id===product.product.id);
    if(itemIndex > -1){
        this.cartItems.splice(itemIndex,1);
        localStorage.setItem('cart',JSON.stringify(this.cartItems));

    }
  }
  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  incrementQuantity(item: Cart) {
    item.quantity++;
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  decrementQuantity(item: Cart) {
    if (item.quantity > 1) {
      item.quantity--;
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }


}
