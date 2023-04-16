import { Component ,OnInit} from '@angular/core';
import { Route, Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductesService } from 'src/app/services/productes.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  categories: any=[];
  products!:Product[];

  constructor(private categoriesService:CategoriesService,private productsServices:ProductesService,private cartservice:CartService,private router: Router){

  }
  ngOnInit() {
    this.getProduct();
    this.categoriesService.getCategories().subscribe(categories=>this.categories=categories)
    this.productsServices.getProductApi().subscribe(products=>this.products=products);
   }

filterByCategory(category:string){
  if(category==='all'){
    this.productsServices.getProductApi().subscribe(products=>this.products=products);
  }else{
    this.productsServices.getProductsByCategoryApi(category).subscribe(products=>this.products=products);
  }
}  
 
addToCart(product:Product){
  this.cartservice.getCartbyIdApi(product.id).subscribe()

  let newCartItem: Cart = { id: product.id,  product: product, quantity: 1 };
  this.cartservice.addToCartApi(newCartItem).subscribe(cart=>{
    if
  });
  //this.router.navigate(['cart']);
}
getProduct(){
  this.productsServices.getProductApi().subscribe(product=>{
    this.products=product
  })
}


}
