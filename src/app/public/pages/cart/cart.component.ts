import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems!: Cart[];
  total: number = 0;
  code: string = '';
  discountnumber: number = 0;
  test: boolean = false;
  constructor(private cartservice: CartService) { }

  ngOnInit() {
    this.cartservice.getCartApi().subscribe(cart => this.cartItems = cart);
    this.getTotalPrice();
  }

  incrementQuantity(product: Cart) {
    this.cartservice.incrementQuantity(product).subscribe(()=>{
      this.getTotalPrice();
    });
    
  }
  decrementQuantity(product: Cart) {
    this.cartservice.decrementQuantity(product).subscribe(()=>{
      this.getTotalPrice();
    });
    
  }

  removeFromCart(id: number | undefined) {
    this.cartservice.removeProductApi(id).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.id != id);
      this.getTotalPrice();
    });
    
  }

  getTotalPrice() {


    this.total = 0;
    this.cartservice.getCartApi().subscribe(cart => {
      for (const item of cart) {
        this.total += item.product.price * item.quantity;
      }
    });

  }

  getDiscountNumber() {
    this.cartservice.getDiscountApi().subscribe(discount => {
      const indx = discount.findIndex(item => item.code === this.code);

      if (indx !== -1) {
        this.discountnumber = discount[indx].discount;
        this.test = false;
      } else {
        this.test = true;
      }
    });

  }
}
