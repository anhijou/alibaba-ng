import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cartItems!:Cart[];

constructor(private cartservice:CartService){}
   

incrementQuantity(product:Cart){
this.cartservice.incrementQuantity(product);
}
decrementQuantity(product:Cart){
  this.cartservice.decrementQuantity(product);
  }
ngOnInit(){
    this.cartservice.getCartApi().subscribe(cart=>this.cartItems=cart);
}
removeFromCart(product:Cart){
this.cartservice.removeProductApi(product);
}

getTotalPrice(){
  return this.cartservice.getTotalPriceApi();
}
}