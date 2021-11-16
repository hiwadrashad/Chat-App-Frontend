import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor() { }

  addmultipleusersgroup : boolean = false;

  addsingleusergroup : boolean = false; 

  currentlyingroupchat : boolean = true;

  currentlyinindividualchat : boolean = false;

  currentlyingeneralchat : boolean = false;

  ngOnInit(): void {
  }

}
