import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyApiService } from 'src/app/company-api.service';

@Component({
  selector: 'app-show-company',
  templateUrl: './show-company.component.html',
  styleUrls: ['./show-company.component.css']
})
export class ShowCompanyComponent implements OnInit {

  companyList$!:Observable<any[]>;
  inventoryList$!:Observable<any[]>;
  inventoryList:any=[];

  inventoryMap:Map<number, string> = new Map();

  constructor(private service:CompanyApiService, private route: Router) { }

  ngOnInit(): void {
    if(this.service.isConnected())
    {
      this.isAdmin = this.service.isAdmin();
      this.companyList$ = this.service.getCompanyList();
    }else
    {
      this.route.navigate(['/']);
    }
  }

  modalTitle:string = '';
  actAddEditCompanyComponent:boolean = false;
  company:any;
  data:any;
  companySelectedName = '';
  isAdmin:boolean = false;

  actInventaryComponent:boolean = false;

  ModalAdd(){
    this.company = {
      nit:0,
      name:null,
      address:null,
      phone:0
    };
    this.modalTitle = "Add Company";
    this.actAddEditCompanyComponent = true;
  }

  modalEdit(item:any)
  {
    this.company = item;
    this.modalTitle = "Edit Company";
    this.actAddEditCompanyComponent = true;
  }

  delete(item:any)
  {
    if(confirm(`Are you sure you want to delete company ${item.nit}?`))
    {
      this.service.deleteCompany(item.nit).subscribe(res => {

        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if(showDeleteSuccess)
        {
          showDeleteSuccess.style.display = "block";
        }
        setTimeout(function() {
          if(showDeleteSuccess) {
            showDeleteSuccess.style.display = "none";
          }
        }, 4000);
        this.companyList$ = this.service.getCompanyList();
      });
    }
  }

  modalClose()
  {
    this.actAddEditCompanyComponent = false;
    this.companyList$ = this.service.getCompanyList();
  }

  modalInventary(item:any)
  {
    this.route.navigate(['Inventories'], {queryParams:{nit:item.nit}});
    /*this.actInventaryComponent = true;
    this.companySelectedName = item.name + " (" + item.nit + ")";
    this.company = item;
    this.data = {
      company: item,
      inventoryList$: this.service.getInventoryByCompanyList(item.nit)
    }*/
  }

  goToUsers(){
    this.route.navigate(['/Users']);
  }
}
