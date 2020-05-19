import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../CustomerService/customer.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AlternatePhoneValidator, AlternateEmailValidator } from '../shared/password.validator';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  addForm: FormGroup;
  submitted: boolean = false;
  username: string
  usernameErrorMessage: string;
  usernameFlag: boolean = false;
  phoneNo: string;
  phoneNoErrorMessage: string;
  phoneNoFlag: boolean = false;
  alternatePhoneNo: string;
  alternatePhoneNoErrorMessage: string;
  alternatePhoneNoFlag: boolean = false;
  alternateEmail: string;
  alternateEmailFlag: boolean = false;
  alternateEmailErrorMessage: string;

  user:User;

  securityQuestion=[
    "Your High School Best Friend? ",
     "Who was your childhood hero? ",
   "In what town or city did your parents meet? ",
     "In what town or city was your first full time job? ",
     "What is your spouse or partner's mother's maiden name? "
   ]

  constructor(private formBuilder:FormBuilder,private customerService: CustomerService,private router :Router) {

   }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){0,2}$")]],
      username: ['', [Validators.required,Validators.email]],
      phoneNo: ['', [Validators.required, Validators.pattern("[6-9][0-9]{9}")]],
      alternatePhoneNo: ['', [Validators.required, Validators.pattern("[6-9][0-9]{9}")]],
      alternateEmail: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required, Validators.pattern("[A-Z][a-z]{2,6}")]],
      role:['',Validators.required],
      password: ['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]],
      securityQuestion:['',Validators.required],
      securityAnswer:['',Validators.required]
    },{ validators : [AlternatePhoneValidator,AlternateEmailValidator]})
  }
  addCustomer()
  {
    this.submitted=true;
    if(this.addForm.invalid)
    return;
    console.log(this.addForm.value)


    this.customerService.registerNewUser(this.addForm.value).subscribe(data => {
      alert(data);
      this.router.navigate(['user/login']);

    }, err => {
      console.log(err.error);

    })

  }
  
}
