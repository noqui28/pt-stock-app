import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyApiService } from 'src/app/company-api.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  userList$!:Observable<any[]>;

  constructor(private service:CompanyApiService, private route: Router) { }

  modalTitle:string = '';
  actAddEditUserComponent:boolean = false;
  user:any;

  ngOnInit(): void {
    if(this.service.isConnected() && this.service.isAdmin())
    {
      this.userList$ = this.service.getUserList();
    }else
    {
      this.route.navigate(['/']);
    }
  }

  ModalAdd(){
    this.user = {
      id:0,
      email:null,
      name:null,
      admin:0
    };
    this.modalTitle = "Add User";
    this.actAddEditUserComponent = true;
  }

  modalEdit(item:any)
  {
    this.user = item;
    this.modalTitle = "Edit User";
    this.actAddEditUserComponent = true;
  }

  delete(item:any)
  {
    if(confirm(`Are you sure you want to delete user ${item.email}?`))
    {
      this.service.deleteUser(item.id).subscribe(res => {

        var showDeleteSuccess = document.getElementById('delete-user-success-alert');
        if(showDeleteSuccess)
        {
          showDeleteSuccess.style.display = "block";
        }
        setTimeout(function() {
          if(showDeleteSuccess) {
            showDeleteSuccess.style.display = "none";
          }
        }, 4000);
        this.userList$ = this.service.getUserList();
      });
    }
  }

  modalClose()
  {
    this.actAddEditUserComponent = false;
    this.userList$ = this.service.getUserList();
  }

}
