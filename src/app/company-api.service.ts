import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompanyApiService {

  readonly companyAPIUrl = "https://localhost:7152/api";
  //readonly companyAPIUrl = "https://pt-stock-api.azurewebsites.net/api";

  constructor(private http:HttpClient, private cookies: CookieService, private route: Router) {
   }

  //Companies
  getCompanyList():Observable<any[]> {
    return this.http.get<any>(this.companyAPIUrl + '/companies', this.getHeaders());
  }

  addCompany(data:any){
    return this.http.post(this.companyAPIUrl + '/companies', data, this.getHeaders());
  }

  updateCompany(id:number|string, data:any) {
    return this.http.put(this.companyAPIUrl + `/companies/${id}`, data, this.getHeaders());
  }

  deleteCompany(id:number|string) {
    return this.http.delete(this.companyAPIUrl + `/companies/${id}`, this.getHeaders());
  }

  //Inventories
  getInventoryList():Observable<any[]> {
    return this.http.get<any>(this.companyAPIUrl + '/inventories', this.getHeaders());
  }

  getInventoryByCompanyList(companyId:number|string):Observable<any[]> {
    return this.http.get<any>(this.companyAPIUrl + `/inventories/bycompany/${companyId}`, this.getHeaders());
  }

  addInventory(data:any){
    return this.http.post(this.companyAPIUrl + '/inventories', data, this.getHeaders());
  }

  updateInventory(id:number|string, data:any) {
    return this.http.put(this.companyAPIUrl + `/inventories/${id}`, data, this.getHeaders());
  }

  deleteInventory(id:number|string) {
    return this.http.delete(this.companyAPIUrl + `/inventories/${id}`, this.getHeaders());
  }

  sendMail(data:any){
    return this.http.post(this.companyAPIUrl + '/inventories/sendmail', data, this.getHeaders());
  }

  //Users
  getUserList():Observable<any[]> {
    return this.http.get<any>(this.companyAPIUrl + '/users', this.getHeaders());
  }

  addUser(data:any){
    return this.http.post(this.companyAPIUrl + '/users', data, this.getHeaders());
  }

  updateUser(id:number|string, data:any) {
    return this.http.put(this.companyAPIUrl + `/users/${id}`, data, this.getHeaders());
  }

  deleteUser(id:number|string) {
    return this.http.delete(this.companyAPIUrl + `/users/${id}`, this.getHeaders());
  }

  createToken(credential:any) {
    return this.http.post(this.companyAPIUrl + `/login/authenticate`, credential, this.getHeaders());
  }

  setToken(token:string)  {
    this.cookies.set("token", token);
  }

  getToken()  {
    return this.cookies.get("token");
  }

  isConnected()  {
    return this.cookies.get("token") != "";
  }

  isAdmin() {
    return this.getUser().admin == 1;
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}` })
    };
  }

  logout() {
    this.cookies.delete("token");
    this.route.navigate(["/"]);
  }

  setUser(user:any)  {
    this.cookies.set("user", JSON.stringify(user));
  }

  getUser():any  {
    return JSON.parse(this.cookies.get("user"));
  }
}
