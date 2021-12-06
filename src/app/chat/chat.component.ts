import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralChat } from 'src/logic/models/generalchat';
import { GroupChat } from 'src/logic/models/groupchat';
import { SingleUserChat } from 'src/logic/models/singleuserchat';
import { User } from 'src/logic/models/user';
import { ApiService } from '../api.service';
import { CommunicationService } from '../communication.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map,startWith} from 'rxjs/operators'
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
  
  myControl = new FormControl();
  filteredOptions! : Observable<SingleUserChat[]>;

  public messagemodel = 
  {
     message : "",
  }

  DisplayObjectName(subject : any)
  {
    return subject ? subject.title : undefined;
  }
  
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

  async AddMessageToChat()
  {
    if (this.currentlyingroupchat == true)
    {
    this.groupchats = await this.api.addmessagetogroupchat(this.user, this.currentgroupchat.id,this.messagemodel.message);
    this.currentgroupchat = this.groupchats.find(a => a.id == this.currentgroupchat.id)!;
    }
    if (this.currentlyinindividualchat == true)
    {
      this.singleuserchats = await this.api.addmessagetosingleuserchat(this.user,this.currentsingleuserchat.id,this.messagemodel.message);
    this.currentsingleuserchat = this.singleuserchats.find(a => a.id == this.currentsingleuserchat.id)!;
    }
    if (this.currentlyingeneralchat == true)
    {
      this.generalchats = await this.api.addmessagetogeneralchat(this.user, this.currentgeneralchat.id,this.messagemodel.message);
      this.currentgeneralchat = this.generalchats.find(a => a.id == this.currentgeneralchat.id)!;
    }
  }

  async ngOnInit(): Promise<void> {
    try
    {
    this.communication.GetLoginUser().subscribe( (input:User) => {
        this.user = input;
    });
    this.groupchats = await this.api.getgroupchatsbyuserid(this.user.id);
    this.groupchats = this.groupchats.filter(function (obj){
      return obj.chatBanned !== true;
    })
    this.generalchats = await this.api.getgeneralchatswithidcredentialsparameter(this.user.id);
    this.generalchats = this.generalchats.filter(function (obj){
      return obj.chatBanned !== true;
    })
    this.singleuserchats = await this.api.getsingleuserchatsbyuserid(this.user.id);
    this.singleuserchats = this.singleuserchats.filter(function (obj){
      return obj.chatBanned !== true;
    })
    }
    catch
    {
      //this.router.navigate(['profileoverview']);
      this.router.navigate(['chat']);
    }
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.convertstringtoarray(value))
    )
  }
private convertstringtoarray(value : string): SingleUserChat[]
{
 const filterValue = value.toLowerCase();
 return this.singleuserchats.filter(options => options.title.toLowerCase().includes(filterValue))
}

}
