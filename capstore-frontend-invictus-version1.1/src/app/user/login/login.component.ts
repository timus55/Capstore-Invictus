import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { JwtClientService } from '../JWTservice/jwt-client.service';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;

  authRequest: any;

  response: any;
  constructor(private formBuilder: FormBuilder, private service: JwtClientService, private router: Router) {


  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({

      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    if(localStorage.token != null && localStorage.role!=null){
     this.service.welcome(localStorage.token).subscribe(data=>{
       if(localStorage.role == 'ROLE_CUSTOMER'){
        this.router.navigate(["/customer"]);
       }
       else if(localStorage.role == 'ROLE_MERCHANT'){
          this.router.navigate(["/merchant"]);

       }
    });
    }
    

  }


  login() {
    this.submitted = true;
    if (this.loginForm.invalid)
      return;
    let username = this.loginForm.controls.username.value;
    let password = this.loginForm.controls.password.value;
    this.authRequest = {
      "userName": username,
      "password": password
    };

    let resp = this.service.generateToken(this.authRequest);
    resp.subscribe(data => {
      if (data == "Invalid") {
        alert("Invalid username/password");
      } else {
        localStorage.token = data
        var decoded = jwt_decode(data);
        var role = decoded['jti'];
        localStorage.role=role;
        if (role == 'ROLE_CUSTOMER') {
          this.router.navigate(["/customer"]);
        }
        else if(role == 'ROLE_MERCHANT'){
          this.router.navigate(["/merchant"]);
        }

      }
    }
    );


  }

}
