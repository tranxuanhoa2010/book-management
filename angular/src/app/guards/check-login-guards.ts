import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';


@Injectable()
export class CheckLoginGuard implements CanActivate {

    constructor(private loginService: LoginService) {

    }
    canActivate() {
        let status = this.loginService.IsLogged(); 
        if(!status){
            alert('You dont have permission access to this page');

        }
        return status;
        // return this.loginService.IsLogged();
    }
}