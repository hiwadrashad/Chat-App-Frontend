import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { ApiService } from '../api.service'; 
import {User} from '../../logic/models/user'
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-profileoverview',
  templateUrl: './profileoverview.component.html',
  styleUrls: ['./profileoverview.component.scss']
})
export class ProfileoverviewComponent implements OnInit {

  name! : string;
  allprofilesbysingleemail! : User[]; 
  constructor(private msalService: MsalService,private communication: CommunicationService,private api : ApiService) { }

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
  }

}
