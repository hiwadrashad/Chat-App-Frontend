import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';
import { ApiService } from '../api.service'; 
import {Router} from '@angular/router';
import { CommunicationService } from '../communication.service';
import {User} from '../../logic/models/user'

@Component({
  selector: 'app-microsoft-login',
  templateUrl: './microsoft-login.component.html',
  styleUrls: ['./microsoft-login.component.scss']
})
export class MicrosoftLoginComponent implements OnInit {

  ngOnInit(): void {
  }
  constructor(private msalService: MsalService, private api : ApiService, private router:Router, private communication: CommunicationService){

  }

  isLoggedIn() : boolean{
    return this.msalService.instance.getActiveAccount() != null
  }

  login(){
    console.log("test0");
    
    //var item = this.msalService.loginRedirect();
    this.msalService.loginPopup()
    .subscribe((response: AuthenticationResult) => {
      console.log("test1");
      this.msalService.instance.setActiveAccount(response.account)
      if (this.msalService.instance.getActiveAccount() != null)
      {
        console.log("test2");
        
        this.communication.SetMicrosoftUser(this.msalService.instance.getActiveAccount()?.username!);
        this.router.navigate(['profileoverview']);
      }
    });

  }

  gotoprofilepage()
  {
    this.communication.SetMicrosoftUser("test");
    this.router.navigate(['profileoverview']);
  }

  logout() {
    this.msalService.logout();
  }
}
