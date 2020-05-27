import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/models/orders.model';
import { Router } from '@angular/router';
import { CustomerService } from '../CustomerService/customer.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {

  order:Order;
  isCouponApplied:any ;
  isDelivered:boolean = true;
  couponApplied:string ="";
  disableButtons:boolean=false;
  constructor(private customerService : CustomerService,private router:Router) { }

  ngOnInit() {
    if(localStorage.role=="ROLE_MERCHANT")
  this.router.navigate(["/merchant"]);
    this.order = this.customerService.getOrder();
    this.customerService.getStatus(localStorage.token,this.order.orderId).subscribe(data=>{
      console.log(data);
      this.isCouponApplied = data;
      if(data == "false"){
        this.couponApplied ="Not Applied";
        this.disableButtons = true;  

      }
      else{
        this.couponApplied ="Applied";
        this.disableButtons = false;  
      }
    },err=>{
      console.log(err)
      if(err.error=="Session Expired"){
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        alert("Session Expired....Login Again");
      this.router.navigate(["/user/login"])
      }
      
    });

    if(this.order.orderStatus === "Delivered"){
      this.isDelivered = false;
    }
    if(this.order.orderStatus === "Cancelled" || this.order.orderStatus === "Request For Return"
     || this.order.orderStatus === "Request For Cancellation"){
      this.disableButtons = false;
      
    }
  }

  requestReturn(){

    if(this.isCouponApplied == "false"){
      this.customerService.updateStatus(localStorage.token,this.order.orderId,"Request For Return").subscribe(data=>{
      console.log(data);
      },err=>{
        console.log(err)
        if(err.error=="Session Expired"){
          alert("Session Expired....Login Again");
        this.router.navigate(["/user/login"])
        }
        
      });

      alert("Your Order is requested for Return")

      this.router.navigate(['customer/orderlist'])
    }
    else{
      alert("Cannot Return as the Coupon was applied on given order")
    }
  }

  requestCancel(){
 
    if(this.isCouponApplied == "false"){
      this.customerService.updateStatus(localStorage.token,this.order.orderId,"Request For Cancellation").subscribe(data=>{
      console.log(data);
      },err=>{
        console.log(err)
        if(err.error=="Session Expired"){
          alert("Session Expired....Login Again");
        this.router.navigate(["/user/login"])
        }
        
      });

      alert("Your Order is requested for Cancellation")

      this.router.navigate(['customer/orderlist'])
    }
    else{
      alert("Cannot Cancel as the Coupon was applied on this order")
    }
  }


}
