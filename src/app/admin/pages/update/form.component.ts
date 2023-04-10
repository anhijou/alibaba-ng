import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductesService } from 'src/app/services/productes.service';

@Component({
  selector: 'app-update',
  templateUrl: './form.component.html',
  
})
export class FormComponent implements OnInit{
   
  productForm !: FormGroup ;

  constructor(private fb:FormBuilder,private route:ActivatedRoute,private productService:ProductesService){

  }
 
  ngOnInit() {
      this.productForm= this.fb.group({
        "id": this.productService.getProduct().length+1,
         "name": '',
         "description": '',
         "price": '',
         "category": '' 
      })

      const productId = Number(this.route.snapshot.paramMap.get('id'));
  if (productId) {
    let pro =this.productService.getProdectById(productId);
    if(pro!=null){
      
        this.productForm.setValue({
          id: pro.id,
          name: pro.name,
          description: pro.description,
          price: pro.price,
          category:pro.category
        });
      ;
    }
    
  }
 

      this.productForm.valueChanges.subscribe(console.log);


  }
  onSubmit(productForm:FormGroup) {
    if (productForm.valid) {

      const productid = Number(this.route.snapshot.paramMap.get('id'));
        let product = productForm.value;
      if (productid) {
         
         this.productService.updateProduct(product);
         console.log(this.productService.getProduct());
      } else {
        
        this.productService.createProduct(product);
        console.log(this.productService.getProduct());
      }
    }
  }
}
