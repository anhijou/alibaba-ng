
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authservice:AuthService) {}
  
    canActivate(): boolean {
      // Your logic to check if the user is authenticated goes here
      // Return true if the user is authorized to access the route, false otherwise
      const currentPath = window.location.pathname;
      const isAuthenticated = this.authservice.isAuthenticated(currentPath); // Replace with your authentication check
  
      if (isAuthenticated) {
        return true;
      } else {
        this.router.navigate(['']); // Redirect to login page if not authenticated
        return false;
      }
    }
  }