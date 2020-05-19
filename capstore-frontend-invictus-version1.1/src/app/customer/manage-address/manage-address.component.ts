import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { address } from 'src/app/models/address.model';
import { CustomerService } from '../CustomerService/customer.service';


@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css']
})
export class ManageAddressComponent implements OnInit {
  addresses: address[];
  emptyy: number = 1;
  temp: boolean;

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.getAddress();
  }
  getAddress() {
    this.customerService.viewAddress(localStorage.token).subscribe(data => {
      this.addresses = data;
      this.emptyy = this.addresses.length;
      if (this.emptyy == 0) {

        this.temp = false;
      }
      else {
        this.temp = true;
      }
    },
      err => {
        console.log(err.stack);
      })
  }
  delete(addId) {
    this.customerService.deleteAddress(addId).subscribe(data => {
      console.log(data);
      alert(`deleted`);
      this.customerService.viewAddress(localStorage.token).subscribe(data => { //localstorage should have username
        this.addresses = data;
        console.log(this.addresses);
      })
    },err=>{
      alert("Session Expired....Login Again");
      this.router.navigate(["/user/login"])
    });



  }

}
