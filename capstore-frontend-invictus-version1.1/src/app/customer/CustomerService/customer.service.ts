import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Order } from 'src/app/models/orders.model';
import { address } from 'src/app/models/address.model';
import { Customer } from 'src/app/models/customer.model';




@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  ShareOrder:Order={
    address:null,
    customer: null,
    orderAmount: null,
    orderDate: null,
    orderId: 0,
    orderStatus: null,
    product: null,
    quantity: 0,
    statusDate: null,
    transaction:null
  }

  registerNewUser(user: User) {
    return this.http.post("http://localhost:8080/addUser", user,  { responseType: 'text' as 'json' });
  }

  forgotPassword(uname,securityQue,securityAns) {
   let forgotPassRequest={
      "username":uname,
      "securityQuestion":securityQue,
      "securityAnswer":securityAns
    }
    return this.http.post<String>("http://localhost:8080/forgotPassword",forgotPassRequest, { responseType: 'text' as 'json' });
  }


  changePassword(token, oldPassword, newPassword){
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get("http://localhost:8080/changePassword/" +oldPassword+ "/" +newPassword,{headers, responseType: 'text' as 'json'} );
  }

  public saveOrder(order:Order){ //sumit
    this.ShareOrder= order;
  }
  public getOrder(){  //sumit
    return this.ShareOrder;
  }
  public getMyOrders(token){  //sumit
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<Order[]>("http://localhost:8080/myorders",{headers});
  }
  public getStatus(token,orderId:number){ //sumit
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<String>(`http://localhost:8080/getStatus/${orderId}`,{headers,responseType:'text' as 'json'});
  }
  public updateStatus(token,orderId:number,status:String){  //sumit
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<Boolean>(`http://localhost:8080/updateStatus/${orderId}/${status}`,{headers});
  }
  addAddress(add:address,token) //sagar
  {
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.post(`http://localhost:8080/addAddress`,add,{headers});
  }
  viewAddress(token){ //sagar
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<address[]>(`http://localhost:8080/viewAddress`,{headers});
  }
  deleteAddress(addressId:number){  //sagar
    let tokenStr = 'Bearer ' + localStorage.token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get(`http://localhost:8080/deleteAddress/${addressId}`,{headers});
  }

  public getcustomerdetails(token) //prajakta
  {
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<Customer>(`http://localhost:8080/getUserDetails`,{headers});
  }

  public editUser(cust:Customer)//prajakta
  {
    let tokenStr = 'Bearer ' + localStorage.token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
   return this.http.put("http://localhost:8080/editUser",cust,{headers,responseType:'text'})
  }
}
