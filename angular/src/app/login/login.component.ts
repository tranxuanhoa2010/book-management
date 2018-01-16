import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
  }

  CheckLogin(value: any) {
    if(value.username == "admin" && value.password == "123456"){
      this.loginService.SetLogin(true);
      this.router.navigate(['/'])

    }
  }

}
