// import { QrCodeComponent } from './components/qrcode/qrcode.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { A } from './components/a.component';


const routes: Routes = [
  { path: '', component: A },
  { path: 'home-component', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
