import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { ShowCompanyComponent } from './company/show-company/show-company.component';
import { AddEditCompanyComponent } from './company/add-edit-company/add-edit-company.component';
import { CompanyApiService } from './company-api.service';
import { InventaryComponent } from './inventary/inventary.component';
import { ShowInventaryComponent } from './inventary/show-inventary/show-inventary.component';
import { AddEditInventaryComponent } from './inventary/add-edit-inventary/add-edit-inventary.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { CookieService } from 'ngx-cookie-service';
import { UserComponent } from './user/user.component';
import { ShowUserComponent } from './user/show-user/show-user.component';
import { AddEditUserComponent } from './user/add-edit-user/add-edit-user.component';


@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    ShowCompanyComponent,
    AddEditCompanyComponent,
    InventaryComponent,
    ShowInventaryComponent,
    AddEditInventaryComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ShowUserComponent,
    AddEditUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [CompanyApiService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
