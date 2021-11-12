import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';
import {ApiService} from './api.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chat-App-Auth0';

  constructor(private msalService: MsalService, private api : ApiService, private router:Router ){
    var item = this.api.getAllUsers().subscribe(data=>{
      console.warn(data)
    })
  }

  isLoggedIn() : boolean{
    this.msalService.instance.getActiveAccount()
    return this.msalService.instance.getActiveAccount() != null
  }

  login(){
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(response.account)
    });
    this.router.navigate(['profileoverview']);
  }

  logout() {
    this.msalService.logout();
  }
}
