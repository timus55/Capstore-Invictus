import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../CustomerService/customer.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassForm: FormGroup;
  msg:String
  submitted: boolean = false;
  securityQuestion=[
    "Your High School Best Friend? ",
     "Who was your childhood hero? ",
   "In what town or city did your parents meet? ",
     "In what town or city was your first full time job? ",
     "What is your spouse or partner's mother's maiden name? "
   ]
  constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private router: Router) { }

  ngOnInit(){
    this.forgotPassForm = this.formBuilder.group({
      username: ['', Validators.required],
      securityQuestion: ['', Validators.required],
      securityAnswer: ['', Validators.required]
    });
}
verifyQuestion() {
  this.submitted = true;
  if (this.forgotPassForm.invalid) {
    return;
  }
  let uname = this.forgotPassForm.controls.username.value;
  let securityQue = this.forgotPassForm.controls.securityQuestion.value;
  let ans = this.forgotPassForm.controls.securityAnswer.value;
 
  // console.log(this.forgotPassForm.value);
  // this.userService.verification(uname,securityQue,ans) 

  this.customerService.forgotPassword(uname,securityQue,ans).subscribe(data => {
    
    if(data=="invalid"){
      alert("Incorrect Security Question or Answer")
    }
    else{
      alert("Your temporary  password is  " + data +" Please login through this password and change it for security purpose");
      this.router.navigate(['/user/login']);
    }
  
  
  },err => {
  console.log(err.error);
  alert(err.error.message);
  
});
}
}