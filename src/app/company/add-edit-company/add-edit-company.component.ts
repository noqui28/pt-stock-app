import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyApiService } from 'src/app/company-api.service';

@Component({
  selector: 'app-add-edit-company',
  templateUrl: './add-edit-company.component.html',
  styleUrls: ['./add-edit-company.component.css']
})
export class AddEditCompanyComponent implements OnInit {

  constructor(private service:CompanyApiService) { }

  @Input() company:any;
  nit:number=0;
  name:string="";
  address:string="";
  phone:number=0;

  ngOnInit(): void {
    this.nit = this.company.nit;
    this.name = this.company.name;
    this.address = this.company.address;
    this.phone = this.company.phone;
  }

  addCompany()
  {
    var company = {
      nit:this.nit,
      name:this.name,
      address:this.address,
      phone:this.phone
    };

    this.service.addCompany(company).subscribe(res => {
      var closeModal = document.getElementById('add-edit-modal-close');
      if(closeModal)
      {
        closeModal.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess)
      {
        showAddSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none";
        }
      }, 4000);
    },(e: HttpErrorResponse) => alert(e.message));
  }

  updateCompany(){
    var company = {
      nit:this.nit,
      name:this.name,
      address:this.address,
      phone:this.phone
    };

    var id:number = this.nit;

    this.service.updateCompany(id, company).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess)
      {
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "none";
        }
      }, 4000);
    });
  }
}
