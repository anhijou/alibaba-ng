import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductesService {

  constructor(private http:HttpClient) { }

  private products :Product[] =[
    { id: 1, name: 'Produit 1', description: 'Description produit 1', price: 10, category: "iphone" },
    { id: 2, name: 'Produit 2', description: 'Description produit 2', price: 20, category: "ipad" },
    { id: 3, name: 'Produit 3', description: 'Description produit 3', price: 30, category: "iphone" },
    { id: 4, name: 'Produit 4', description: 'Description produit 4', price: 40, category: "ipad" },
    { id: 5, name: 'Produit 5', description: 'Description produit 5', price: 50, category: "iphone" },
    { id: 6, name: 'Produit 6', description: 'Description produit 6', price: 60, category: "ipad" },
  ];

    private API_URL='http://localhost:3000/products'
  getProduct(){
     return this.products;
  }
  getProductApi(): Observable<Product[]>{
    return this.http.get<Product[]>(this.API_URL);

 }
 getProducts() {
  const timestamp = new Date().getTime();
  return this.http.get(`${this.API_URL}?_=${timestamp}`)
    .pipe(
      map((response: any) => response.products)
    );
}
///////////////////////////////////////////
  getProductsByCategoryApi(category :string): Observable<Product[]>{
   const url = `${this.API_URL}/?category=${category}`;
   return this.http.get<Product[]>(url);
  }
  getProductsByCategory(category :string) {
   return  this.products.filter(item => item.category===category);
  }
  ///////////////////////////////
  getProductByIdApi(id: number): Observable<Product> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<Product>(url);
  }
  
  getProdectById(id:number){
    const item = this.products.find(item => item.id==id);
    if(!item){
      return null;
    }
    return item;
  }
///////////////////////////////////////////////////
  deleteProduct(id:number){
    let itemIndex = this.products.findIndex(item => item.id===id);
    if(itemIndex > -1){
        this.products.splice(itemIndex,1);
    }
  }
  deleteProductApi(id: number){
    const url = `${this.API_URL}/${id}`;
     this.http.delete<Product>(url).subscribe();

  }

  /////////////////////////////////////////////////

  updateProduct(product:Product): void {
    const index = this.products.findIndex(item => item.id === product.id);
    this.products[index] = product;
  }
 
  updateProductApi(product: Product): Observable<Product> {
    const url = `${this.API_URL}/${product.id}`;
    return this.http.put<Product>(url, product);
  }
  

/////////////////////////////////////////////////
  createProduct(product:Product):void{
    this.products.push(product);
  }

  createProductApi(product:Product): Observable<Product> {
    return this.http.post<Product>(this.API_URL, product);
  }
  //////////////////////////////
  searchProducts(searchTerm: string): Product[] {
    return this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
      || product.description.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase())
      || product.price.toString().includes(searchTerm.toLowerCase())
    );
  }
}
