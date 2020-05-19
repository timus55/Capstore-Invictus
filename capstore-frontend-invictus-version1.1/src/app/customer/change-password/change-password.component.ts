import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../CustomerService/customer.service';
import { PasswordValidator } from '../shared/password.validator';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm : FormGroup;
  submitted : boolean = false;
  username = 'shivam';
  errorMessage = '';
  constructor(private formBuilder: FormBuilder,
     private router: Router, private customerService: CustomerService) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword:['',Validators.required],
      newPassword: ['', [Validators.required,Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]],
      confirmPassword: ['', Validators.required]
    },{ validators : PasswordValidator});
  }
  verifyAndChangePassword(){
    this.submitted = true;
    if(this.changePasswordForm.invalid)
    return;
    let oldPassword = this.changePasswordForm.controls.oldPassword.value;
    let newPassword = this.changePasswordForm.controls.newPassword.value;

    this.customerService.changePassword(localStorage.token, oldPassword, newPassword).subscribe(data=>{
      if(data=="true"){
        alert(`Password Changed Successfully...!`);
        this.router.navigate(['/customer']);
      }else{
        alert("Enter correct current password")
      }
    },err=>{
      alert("Session Expired....Login Again..!");
      this.router.navigate(["/user/login"])
    })
    
    
  }

}
