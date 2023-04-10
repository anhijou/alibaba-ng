import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categories = 'http://localhost:3000/categories';

constructor(private http:HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(this.categories);
  }
}
