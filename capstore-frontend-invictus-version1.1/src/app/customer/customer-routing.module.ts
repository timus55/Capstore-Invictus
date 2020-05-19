import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ManageAddressComponent } from './manage-address/manage-address.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { StatusComponent } from './status/status.component';
import { ReturnComponent } from './return/return.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';


const routes: Routes = [
  {path:'',component:DashboardComponent,children:[

    {path:'addCustomer',component:AddCustomerComponent},
    {path:'forgotPassword',component:ForgotPasswordComponent},
    {path:'changePassword', component:ChangePasswordComponent},
    {path:'add-address', component:AddAddressComponent},
  {path:'edit-customer', component:EditCustomerComponent},
  {path:'manage-address', component:ManageAddressComponent},
  {path:'orderlist',component:OrderlistComponent},
  {path:'status',component:StatusComponent},
  {path:'return',component:ReturnComponent},
  {path:'**', component:CustomerHomeComponent}
    /*
    Write the same routing required here inside.
    For Example: 
    { path :'addCustomer' , component: AddCustomerComponent }
   
   */
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
