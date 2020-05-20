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
 cancellation:boolean = true;
 cancelStatus:boolean = true;
 couponApplied:string ="Applied";
  constructor(private customerService : CustomerService,private router:Router) { }

  ngOnInit() {
    this.order = this.customerService.getOrder();
    this.customerService.getStatus(localStorage.token,this.order.orderId).subscribe(data=>{
      console.log(data);
      this.isCouponApplied = data;
    })

    if(this.order.orderStatus === "Delivered"){
      this.cancellation = false;
    }
    if(this.order.orderStatus === "Cancelled"){
      this.cancelStatus = false;
    }
    if(this.isCouponApplied == "false"){
      this.couponApplied ="Not Applied";
    }
    else{
      this.couponApplied ="Applied";

    }
  }

  return(){

    if(this.isCouponApplied == "false"){
      this.customerService.updateStatus(localStorage.token,this.order.orderId,"Request For Return").subscribe(data=>{
      console.log(data);
      })

      alert("Your Order is requested for Return")

      this.router.navigate(['customer/orderlist'])
    }
    else{
      alert("Cannot Return as the Coupon was applied on given order")
    }
  }

  cancel(){
 
    if(this.isCouponApplied == "false"){
      this.customerService.updateStatus(localStorage.token,this.order.orderId,"Request For Cancellation").subscribe(data=>{
      console.log(data);
      },err=>{
        alert("Session Expired....Login Again");
        this.router.navigate(["/user/login"])
      });

      alert("Your Order is requested for Cancellation")

      this.router.navigate(['customer/orderlist'])
    }
    else{
      alert("Cannot Cancel as the Coupon was applied on this order")
    }
  }


}
