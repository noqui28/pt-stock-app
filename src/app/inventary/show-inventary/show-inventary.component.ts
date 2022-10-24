import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { Observable } from 'rxjs';
import { CompanyApiService } from 'src/app/company-api.service';

@Component({
  selector: 'app-show-inventary',
  templateUrl: './show-inventary.component.html',
  styleUrls: ['./show-inventary.component.css']
})
export class ShowInventaryComponent implements OnInit {

  constructor(private service:CompanyApiService, private routeAct: ActivatedRoute, private route: Router) { }

  inventoryList$!:Observable<any[]>;
  inventory:any;

  //@Input() data:any;
  nit:number= 0;
  username:string="";
  isAdmin:boolean=false;
  email:string="";

  modalTitle:string = "";
  actAddEditInventaryComponent:boolean = false;

  public SavePDF(){
    const doc = new jsPDF();
    autoTable(doc, { html: '#toExportPdf' })
    doc.save('download.pdf');  
  }  

  ngOnInit(): void {
    if(this.service.isConnected())
    {
      this.isAdmin = this.service.isAdmin();
      this.username = this.service.getUser().name;
      this.routeAct.queryParams.subscribe((params:any) => {
        this.nit = params.nit;
      });
      this.inventoryList$ = this.service.getInventoryByCompanyList(this.nit);
    }else
    {
      this.route.navigate(['/']);
    }
  }

  ModalAddInventary()
  {
    this.modalTitle = "Add Inventory";
    this.actAddEditInventaryComponent = true;
    this.inventory = {
      id:0,
      name:"",
      quantity:0,
      companyNit:this.nit
    };
  }

  addQuantity(item:any)
  {
    this.modalTitle = "Edit Inventory";
    this.actAddEditInventaryComponent = true;
    this.inventory = {
      id:item.id,
      name:item.name,
      quantity:item.quantity,
      companyNit:this.nit
    };
  }

  delete(item:any)
  {
    if(confirm(`Are you sure you want to delete inventary ${item.name}?`))
    {
      this.service.deleteInventory(item.id).subscribe(res => {

        var showDeleteSuccess = document.getElementById('delete-inv-success-alert');
        if(showDeleteSuccess)
        {
          showDeleteSuccess.style.display = "block";
        }
        setTimeout(function() {
          if(showDeleteSuccess) {
            showDeleteSuccess.style.display = "none";
          }
        }, 4000);
        this.inventoryList$ = this.service.getInventoryByCompanyList(this.nit);
      });
    }
  }

  backCompanies()
  {
    this.route.navigate(['Companies']);
  }

  logout()
  {
    this.service.logout();
  }

  modalClose()
  {
    this.actAddEditInventaryComponent = false;
    this.inventoryList$ = this.service.getInventoryByCompanyList(this.nit);
  }

  SendMail()
  {
    var mailData = {
      receptor: this.email,
      nitCompany: this.nit
    };
    this.service.sendMail(mailData).subscribe((res:any) => { alert(res.message)});
  }
}
