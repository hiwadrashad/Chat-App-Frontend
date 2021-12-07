import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralChat } from 'src/logic/models/generalchat';
import { GroupChat } from 'src/logic/models/groupchat';
import { SingleUserChat } from 'src/logic/models/singleuserchat';
import { User } from 'src/logic/models/user';
import { ApiService } from '../api.service';
import { CommunicationService } from '../communication.service';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import {map,startWith} from 'rxjs/operators'
import { TempGroup } from 'src/logic/models/tempgroup';
import { TempUsername } from 'src/logic/models/tempusername';
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
  
  users! : User[]

  myControl = new FormControl();
  filteredOptions! : Observable<User[]>;

  public messagemodel = 
  {
     message : ""
  }

  public usernamemodel = new TempUsername;

  public addgroupmodel = new TempGroup;

  addeduserstogroup = 0;

  wait(ms : number){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

  async AddUserToGroupChat()
  {
    if (this.users.some((item) => item.username == this.usernamemodel.user.username))
    {
      if (!this.addgroupmodel.users.some((item) => item.username == this.usernamemodel.user.username))
      {
    this.addgroupmodel.users.push(this.users.find(a => a.username == this.usernamemodel.user.username)!);
    this.addeduserstogroup = this.addgroupmodel.users.length;
      }
    }
  }

  async AddGroupChat(data : NgForm)
  {
    this.api.addgroupchat(this.user,this.addgroupmodel);
    this.messagemodel.message = ""
    this.usernamemodel = {} as TempUsername;
    this.addgroupmodel = {} as TempGroup;
    this.addeduserstogroup = 0;
    this.addmultipleusersgroup = false;
    this.wait(500);
    this.groupchats = await this.api.getgroupchatsbyuserid(this.user.id);
    console.log(this.groupchats);
    this.groupchats = this.groupchats.filter(function (obj){
      return obj.chatBanned !== true;
    })
  }

  DisplayObjectName(subject : any)
  {
    return subject ? subject.username : undefined;
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
    console.log(this.user.id);
    this.users = await this.api.getusers(this.user.id);
    console.log(this.users);
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
private convertstringtoarray(value : string): User[]
{
 const filterValue = value.toLowerCase();
 return this.users.filter(options => options.username.toLowerCase().includes(filterValue));
}

}
