import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router : Router) { }
  logOutUser() {
    if (localStorage.token != null) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      this.router.navigate(['/home']);
    }
  }
}
