import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductesService } from 'src/app/services/productes.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent  implements OnInit {

  constructor(private productService:ProductesService,private router:Router,private activatedRoute:ActivatedRoute,private cartservice:CartService){

  }

  product!: Product;

  ngOnInit(){
    let id = Number(this.activatedRoute.snapshot.params['id']);
     this.productService.getProductByIdApi(id).subscribe(product => {
      this.product = product;
      if(this.product==null){
        console.log('errur');
        this.router.navigateByUrl('shop');
      }
    });

    

  }
addToCart(product:Product){
  let newCartItem: Cart = { id: product.id,  product: product, quantity: 1 };
  this.cartservice.addToCartApi(newCartItem);
}




}
