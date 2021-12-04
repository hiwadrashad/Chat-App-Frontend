import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralChat } from 'src/logic/models/generalchat';
import { GroupChat } from 'src/logic/models/groupchat';
import { SingleUserChat } from 'src/logic/models/singleuserchat';
import { User } from 'src/logic/models/user';
import { ApiService } from '../api.service';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor( private api : ApiService, private router:Router, private communication: CommunicationService) { }

  user! : User;

  addmultipleusersgroup : boolean = false;

  addsingleusergroup : boolean = false; 

  currentlyingroupchat : boolean = true;

  currentlyinindividualchat : boolean = false;

  currentlyingeneralchat : boolean = false;

  singleuserchats! : SingleUserChat[];

  groupchats! : GroupChat[];

  generalchats! : GeneralChat[];

  currentsingleuserchat! : SingleUserChat;

  currentgroupchat! : GroupChat;
  
  currentgeneralchat! : GeneralChat;
  
  SetSingleUserChat(input : SingleUserChat)
  {
    this.currentsingleuserchat = input;
  }

  SetGroupChat(input : GroupChat)
  {
    this.currentgroupchat = input;
  }

  SetGeneralChat(input : GeneralChat)
  {
    this.currentgeneralchat = input;
  }

  async ngOnInit(): Promise<void> {
    try
    {
    this.communication.GetLoginUser().subscribe( (input:User) => {
        this.user = input;
    });
    this.groupchats = await this.api.getgroupchatsbyuserid(this.user.id);
    this.generalchats = await this.api.getgeneralchatswithidcredentialsparameter(this.user.id);
    this.singleuserchats = await this.api.getsingleuserchatsbyuserid(this.user.id);
    this.groupchats.forEach(element => {
      element.messages.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    });
    this.generalchats.forEach(element => {
      element.messages.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    }); this.singleuserchats.forEach(element => {
      element.messages.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    });
    }
    catch
    {
      this.router.navigate(['profileoverview']);
    }
  }

}
