import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyApiService } from '../company-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:string = "";
  password: string = "";

  constructor(public service: CompanyApiService, public router: Router) { }

  login() {
    const credential = {email: this.email, password: this.password};
    this.service.createToken(credential).subscribe({
      next: (data:any) => {
        this.service.setToken(data.token);
        this.service.setUser(data.user);
      },
      error: (error) => {
        console.log(error.error.title);
      },
      complete: () => {
        this.router.navigateByUrl('/Companies');
      }});
  }
}
