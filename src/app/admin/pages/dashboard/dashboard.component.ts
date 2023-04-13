import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductesService } from 'src/app/services/productes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
     productlist!:Product[];
     products$!: Observable<Product[]>;
     searchTerm: string = '';
     searchProduct!:Product[];

  constructor(private producteservice:ProductesService, private cdRef:ChangeDetectorRef){

  }

  ngOnInit(){
    this.getProduct();
    
   }

   getProduct(){
    this.producteservice.getProductApi().subscribe(products => {
      this.productlist =this.searchProduct= products;
      });
   }

  search(): void {
    this.productlist=this.searchProduct.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      || product.description.toLowerCase().includes(this.searchTerm.toLowerCase()) || product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      || product.price.toString().includes(this.searchTerm.toLowerCase())
    );
  }

  
  deleteProdect(id:number){
    this.producteservice.deleteProductApi(id).subscribe(()=>
    {
      this.productlist=this.productlist.filter(product=>product.id!=id);
    });
  }

}
