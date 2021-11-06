import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chat-App-Auth0';

  constructor(private msalService: MsalService){
    
  }

  isLoggedIn() : boolean{
    return this.msalService.instance.getActiveAccount() != null
  }

  login(){
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(response.account)
    });
  }

  logout() {
    this.msalService.logout();
  }
}
