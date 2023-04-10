import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

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

  getCartbyId(id:number){
    const url = `${this.cartItems}/${id}`;
    return this.http.get<Cart>(url);

  }

  addToCartApi(cart: Cart) {

//   this.cartItem=this.getCartbyId(cart.id);
  
//   this.http.post<Product>(this.cartItems, product).subscribe(); 
//   const value = this.cartItem.toPromise;
//   console.log(value);
//   let myVariable: any;

// this.cartItem.subscribe(value => {
//   myVariable = value;
// });
// console.log(myVariable);
 }
    
 



/////////////////////////////////////////////
  // removeProduct(product:Cart){
  //   let itemIndex = this.cartItems.findIndex(item => item.product.id===product.product.id);
  //   if(itemIndex > -1){
  //       this.cartItems.splice(itemIndex,1);
  //       localStorage.setItem('cart',JSON.stringify(this.cartItems));

  //   }
  // }

  removeProductApi(product:Cart){
    const url = `${this.cartItems}/${product.id}`;
    this.http.get<Cart>(url).subscribe((item: Cart) => {
      if (item) {
        this.http.delete<Cart>(url).subscribe();
      } 
    });
  }




/////////////////////////////////////////////
  // getTotalPrice() {
  //   return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  // }

  getTotalPriceApi(): Observable<number> {
    return this.http.get<Cart[]>(this.cartItems).pipe(
      map((cartItems: Cart[]) => {
        let total = 0;
        for (const item of cartItems) {
          total += item.product.price * item.quantity;
        }
        return total;
      })
    );
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
