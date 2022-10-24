import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShowInventaryComponent } from './inventary/show-inventary/show-inventary.component';
import { CompanyComponent } from './company/company.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { UserComponent } from './user/user.component';

const routes:Routes =[
  {path: 'Companies', component: CompanyComponent},
  {path: 'Inventories', component: ShowInventaryComponent},
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'Login', component: LoginComponent},
  {path: 'Register', component: RegisterComponent},
  {path: 'Users', component: UserComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
