import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Discount } from '../interfaces/discount';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = 'http://localhost:3000/Cart';
  private discount = 'http://localhost:3000/Discount';
  constructor(private http: HttpClient) { }

  ////////////////////////////
  getCartApi(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.cartItems);
  }
  getDiscountApi(): Observable<Discount[]> {
    return this.http.get<Discount[]>(this.discount);
  }
  // getCart(){
  //   let cartdata = localStorage.getItem('cart');
  //   if(cartdata){
  //     return this.cartItems = JSON.parse(cartdata);
  //   }
  // }
  ////////////////add//////////////////////
  // addToCart(product:Product){

  //   let item = this.cartItems.find(item => item.product.id===product.id);
  //  if(item){
  //   item.quantity++;
  //  }else{
  //   this.cartItems.push({product:product,quantity:1});
  //  }
  //   this.http.post<Product>(this.cartItems, product);   
  // }

  cartItem!: Observable<Cart>;

  getCartbyIdApi(id: number) {
    const url = `${this.cartItems}/${id}`;
    return this.http.get<Cart>(url);

  }

  addToCartApi(cart: Cart) {

    return this.http.post<Cart[]>(this.cartItems, cart);

  }
  updateCartQuantity(cart: Cart) {
    const url = `${this.cartItems}/${cart.id}`;
    return this.http.put<Cart>(url, cart);
  }




  /////////////////////////////////////////////
  // removeProduct(product:Cart){
  //   let itemIndex = this.cartItems.findIndex(item => item.product.id===product.product.id);
  //   if(itemIndex > -1){
  //       this.cartItems.splice(itemIndex,1);
  //       localStorage.setItem('cart',JSON.stringify(this.cartItems));

  //   }
  // }

  removeProductApi(id: number | undefined) {
    const url = `${this.cartItems}/${id}`;

    return this.http.delete<Cart>(url);

  }




  /////////////////////////////////////////////
  // getTotalPrice() {
  //   return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  // }

  getTotalPriceApi() {
    return this.http.get<Cart[]>(this.cartItems);
  }
  ///////////////////////////////////////////////////////////////////////////////////////
  // incrementQuantity(item: Cart) {
  //   item.quantity++;
  //   localStorage.setItem('cart', JSON.stringify(this.cartItems));
  // }

  incrementQuantity(item: Cart) {
    const url = `${this.cartItems}/${item.id}`;
    item.quantity++;
    this.http.put<Cart>(url, item).subscribe();

  }
  //////////////////////////////////////////////////////////////////////////

  decrementQuantity(item: Cart) {
    const url = `${this.cartItems}/${item.id}`;
    if (item.quantity > 1) {
      item.quantity--;
      this.http.put<Cart>(url, item).subscribe();
    }
  }



}
