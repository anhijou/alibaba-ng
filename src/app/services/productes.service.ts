import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductesService {

  constructor(private http:HttpClient) { }

  

    private API_URL='https://api-server-baqy.onrender.com/products'
  
  getProductApi(): Observable<Product[]>{
    return this.http.get<Product[]>(this.API_URL);

 }

///////////////////////////////////////////
  getProductsByCategoryApi(category :string): Observable<Product[]>{
   const url = `${this.API_URL}/?category=${category}`;
   return this.http.get<Product[]>(url);
  }
  // getProductsByCategory(category :string) {
  //  return  this.products.filter(item => item.category===category);
  // }
  ///////////////////////////////
  getProductByIdApi(id: number): Observable<Product> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<Product>(url);
  }
  
  // getProdectById(id:number){
  //   const item = this.products.find(item => item.id==id);
  //   if(!item){
  //     return null;
  //   }
  //   return item;
  // }
///////////////////////////////////////////////////
  // deleteProduct(id:number){
  //   let itemIndex = this.products.findIndex(item => item.id===id);
  //   if(itemIndex > -1){
  //       this.products.splice(itemIndex,1);
  //   }
  // }
  deleteProductApi(id: number){
    const url = `${this.API_URL}/${id}`;
     return this.http.delete<Product>(url);

  }

  /////////////////////////////////////////////////

  // updateProduct(product:Product): void {
  //   const index = this.products.findIndex(item => item.id === product.id);
  //   this.products[index] = product;
  // }
 
  updateProductApi(product: Product): Observable<Product> {
    const url = `${this.API_URL}/${product.id}`;
    return this.http.put<Product>(url, product);
  }
  

/////////////////////////////////////////////////
  // createProduct(product:Product):void{
  //   this.products.push(product);
  // }

  createProductApi(product:Product): Observable<Product> {
    return this.http.post<Product>(this.API_URL, product);
  }
  //////////////////////////////
  
}
