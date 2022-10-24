import { Component, Input, OnInit } from '@angular/core';
import { CompanyApiService } from 'src/app/company-api.service';

@Component({
  selector: 'app-add-edit-inventary',
  templateUrl: './add-edit-inventary.component.html',
  styleUrls: ['./add-edit-inventary.component.css']
})
export class AddEditInventaryComponent implements OnInit {

  constructor(private service:CompanyApiService) { }

  @Input() inventory:any;
  id:number=0;
  name:string="";
  quantity:number=0;
  companyNit:number=0;

  ngOnInit(): void {
    this.id = this.inventory.id;
    this.name = this.inventory.name;
    this.quantity = this.inventory.quantity;
    this.companyNit = this.inventory.companyNit;
  }

  addInventory()
  {
    var inventory = {
      name: this.name,
      quantity: this.quantity,
      companyNit: this.inventory.companyNit
    };

    this.service.addInventory(inventory).subscribe(res => {
      var closeModal = document.getElementById('add-edit-modal-inv-close');
      if(closeModal)
      {
        closeModal.click();
      }

      var showAddSuccess = document.getElementById('add-inv-success-alert');
      if(showAddSuccess)
      {
        showAddSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none";
        }
      }, 4000);
    });
  }

  updateInventory()
  {
    var inventory = {
      id: this.inventory.id,
      name: this.name,
      quantity: this.quantity,
      companyNit: this.inventory.companyNit
    };



    this.service.updateInventory(this.inventory.id, inventory).subscribe(res => {
      var closeModal = document.getElementById('add-edit-modal-inv-close');
      if(closeModal)
      {
        closeModal.click();
      }

      var showAddSuccess = document.getElementById('update-inv-success-alert');
      if(showAddSuccess)
      {
        showAddSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none";
        }
      }, 4000);
    });
  }
}
