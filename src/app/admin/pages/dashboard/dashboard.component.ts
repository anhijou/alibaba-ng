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
  constructor(private producteservice:ProductesService, private cdRef:ChangeDetectorRef){

  }

  ngOnInit(){
    this.producteservice.getProductApi().subscribe(products => {
      this.productlist = products;
      });
      this.products$ = this.producteservice.getProductApi();
}
  search(): void {
    this.productlist = this.producteservice.searchProducts(this.searchTerm);
  }

  
  deleteProdect(id:number){
    this.producteservice.deleteProductApi(id);
  }
}
