import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PublicComponent } from './public.component';
import { AppRoutingModule } from '../app-routing.module';
import { NavComponent } from './body/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './auth/login/login.component';
import { ShopDetailsComponent } from './pages/shop-details/shop-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PublicComponent,
    NavComponent,
    HomeComponent,
    ShopComponent,
    CartComponent,
    LoginComponent,
    ShopDetailsComponent,

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PublicModule { }
