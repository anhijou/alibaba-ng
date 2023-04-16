import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductesService } from 'src/app/services/productes.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private productService:ProductesService,private router:Router,private activatedRoute:ActivatedRoute){

  }
  productDetails!:Product|null;

  ngOnInit(){
    let id = this.activatedRoute.snapshot.params['id'];
    this.getProductDetails(id);
  }

  getProductDetails(id:number){
    this.productService.getProductByIdApi(id).subscribe(product=>
      this.productDetails=product)
  }
}
