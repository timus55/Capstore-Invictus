import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormGroup } from '@angular/forms';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'/user/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { 
  addForm: FormGroup
  submitted: boolean = false;
  username: string


}
