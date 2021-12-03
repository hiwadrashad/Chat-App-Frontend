import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { ApiService } from '../api.service'; 
import {User} from '../../logic/models/user'
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profileoverview',
  templateUrl: './profileoverview.component.html',
  styleUrls: ['./profileoverview.component.scss']
})
export class ProfileoverviewComponent implements OnInit {

  name! : string;
  allprofilesbysingleemail! : User[]; 
  msalServiceInstance! : MsalService;
  constructor( private msalService: MsalService,private communication: CommunicationService,private api : ApiService, private router : Router) {
      this.msalServiceInstance = msalService;
   }

  ngOnInit(): void {
    
    if (this.msalService.instance.getActiveAccount() != null)
    {
      var Account = this.msalService.instance.getActiveAccount();
      if (Account?.username != null || Account?.username != "")
        {
          this.api.getUsersByEmailAdress(Account?.username!).subscribe(
            x => 
            {
              console.log(x);
              this.allprofilesbysingleemail = x as User[];
            }
          )
        }      
    }
    // temporarily bypass
    this.api.getUsersByEmailAdress("hiwad.rashad@itvitaelearning.nl").subscribe(
      x => 
      {
        console.log(x);
        this.allprofilesbysingleemail = x as User[];
      }
    )
  }


  login(input : number)
  {
    this.communication.SetLoginUser(this.allprofilesbysingleemail.find(a => a.id == input)!)
    this.router.navigate(['login']);
  }

}
