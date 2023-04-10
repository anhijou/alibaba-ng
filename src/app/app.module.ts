import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PublicModule } from './public/public.module';
import { AdminModule } from './admin/admin.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicModule,
    AdminModule,
    ReactiveFormsModule,
    CommonModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
