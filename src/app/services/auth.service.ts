import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private router: Router) {}

    isAuthenticated(url: string): boolean {
        // Check if the URL starts with '/admin'
        if (url.startsWith('/admin')) {
          // Check if the user is authenticated
          return false;
    
        }
    
        return true;
      }

}
