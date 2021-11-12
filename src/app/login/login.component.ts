import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';
import { ApiService } from '../api.service'; 
import {Router} from '@angular/router';
import { CommunicationService } from '../communication.service';
import {User} from '../../logic/models/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user! : User;
  ngOnInit(): void {
  }
  constructor(private msalService: MsalService, private api : ApiService, private router:Router, private communication: CommunicationService){
    this.user = {} as User;
    var item = this.api.getAllUsers().subscribe(data=>{
      console.warn(data)
    });
  }

  isLoggedIn() : boolean{
    this.msalService.instance.getActiveAccount()
    return this.msalService.instance.getActiveAccount() != null
  }

  login(){
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(response.account)
      if (this.msalService.instance.getActiveAccount() != null)
      {
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
