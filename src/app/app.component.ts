import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Book Management';
  public isLoggedin: boolean;
  constructor(private loginService: LoginService) {

  }

  ngOnInit() {
    this.isLoggedin = this.loginService.IsLogged();
  }

  Logout() {
    this.loginService.SetLogin(false);
    alert('Logout');
  }
}
