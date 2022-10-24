import { Component, OnInit } from '@angular/core';
import { CompanyApiService } from 'src/app/company-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email:string = "";
  password:string = "";
  confirmPassword:string = "";

  constructor(public service: CompanyApiService) { }

  ngOnInit(): void {
  }

  register() {
    const user = { email: this.email, password: this.password };
    this.service.addUser(user).subscribe(data => {
      console.log(data);
    });
  }
}
