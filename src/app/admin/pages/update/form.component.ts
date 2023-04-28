import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductesService } from 'src/app/services/productes.service';

@Component({
  selector: 'app-update',
  templateUrl: './form.component.html',
  
})
export class FormComponent implements OnInit{
   
  productForm !: FormGroup ;
  productlenght!:number;
  
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private productService:ProductesService,private router:Router){

  }
   
  ngOnInit() {
     this.getProductlength();
      this.productForm= this.fb.group({
        "id": this.productlenght+1,
         "name": '',
         "description": '',
         "price": '',
         "category": '' 
      })

      const productId = Number(this.route.snapshot.paramMap.get('id'));
  if (productId) {
    
     this.getProductDetails(productId);
    
  }
 
      this.productForm.valueChanges.subscribe(console.log);
  }


  getProductlength(){
    this.productService.getProductApi().subscribe(products => {
      this.productlenght = products.length;
      console.log(this.productlenght);
      });
   }
  getProductDetails(productId:number){
    this.productService.getProductByIdApi(productId).subscribe(product => {
      this.productForm.setValue({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category
        
      });
    });
  }
  onSubmit(productForm:FormGroup) {
    if (productForm.valid) {

      const productid = Number(this.route.snapshot.paramMap.get('id'));
        let product = productForm.value;
      if (productid) {
         
         this.productService.updateProductApi(product).subscribe(()=>{
          this.productService.getProductApi().subscribe();
         });
         

      } else {
        
        this.productService.createProductApi(product).subscribe(()=>{
          this.productService.getProductApi().subscribe();
         });


      }
      this.router.navigate(['admin/dashboard']);
    }
  }
}
