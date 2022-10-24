import { Component, OnInit } from '@angular/core';
import { CompanyApiService } from '../company-api.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private service:CompanyApiService) { }

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
}
