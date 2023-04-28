import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { LoginComponent } from './public/auth/login/login.component';
import { CartComponent } from './public/pages/cart/cart.component';
import { HomeComponent } from './public/pages/home/home.component';
import { ShopDetailsComponent } from './public/pages/shop-details/shop-details.component';
import { ShopComponent } from './public/pages/shop/shop.component';
import { PublicComponent } from './public/public.component';
import { DetailsComponent } from './admin/pages/details/details.component';
import { FormComponent } from './admin/pages/update/form.component';
import { AuthGuard } from './admin/auth.guard';
import { NotFoundComponent } from './public/pages/not-found/not-found.component';




const routes: Routes = [
    {path: '', component: PublicComponent, children: [
        {path: '', component: HomeComponent},
        {path: 'shop', component: ShopComponent},
        {path: 'cart', component: CartComponent},
        {path: 'login', component: LoginComponent},
        { path: 'shop-details/:id', component: ShopDetailsComponent },
    ]},
    {path: 'admin', component: AdminComponent,canActivate: [AuthGuard], children: [
        {path: 'dashboard', component: DashboardComponent},
        { path: 'dashboard/details', component: DetailsComponent },
        {path: 'dashboard/form', component: FormComponent},
        {path: 'dashboard/form/:id', component: FormComponent},
        { path: 'dashboard/details/:id', component: DetailsComponent }
    ]},
    // { path: '**', component: NotFoundComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }