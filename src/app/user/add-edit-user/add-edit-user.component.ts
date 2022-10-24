import { Component, Input, OnInit } from '@angular/core';
import { CompanyApiService } from 'src/app/company-api.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  constructor(private service:CompanyApiService) { }

  @Input() user:any;
  id:number=0;
  name:string="";
  email:string="";
  password:string="";
  admin:number=0;

  ngOnInit(): void {
    this.id = this.user.id;
    this.name = this.user.name;
    this.email = this.user.email;
    this.admin = this.user.admin;
    this.password = this.user.password;
  }

  addUser()
  {
    var user = {
      name:this.name,
      email:this.email,
      admin:this.admin,
      password:this.password
    };

    this.service.addUser(user).subscribe(res => {
      var closeModal = document.getElementById('add-edit-modal-close');
      if(closeModal)
      {
        closeModal.click();
      }

      var showAddSuccess = document.getElementById('add-user-success-alert');
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

  updateUser(){
    var user = {
      id:this.id,
      name:this.name,
      email:this.email,
      admin:this.admin,
      password:this.password
    };

    var id:number = this.id;

    this.service.updateUser(id, user).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-user-success-alert');
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
