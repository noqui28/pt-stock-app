import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyApiService } from '../company-api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private service:CompanyApiService, private route:Router) { }

  ngOnInit(): void {
    if(this.service.isConnected())
    {
      this.username = this.service.getUser().name;
    }
  }

  username:string="";

  logout()
  {
    this.service.logout();
  }

  backCompanies()
  {
    this.route.navigate(['Companies']);
  }

}
