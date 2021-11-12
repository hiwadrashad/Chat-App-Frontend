import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
@Component({
  selector: 'app-profileoverview',
  templateUrl: './profileoverview.component.html',
  styleUrls: ['./profileoverview.component.scss']
})
export class ProfileoverviewComponent implements OnInit {

  name! : string;
  constructor(private communication: CommunicationService) { }

  ngOnInit(): void {
    // console.warn("test")
    // this.communication.getMessage()
    // .subscribe(communicationemit =>{
    //   console.warn("test2")
    //   if(communicationemit){
    //     console.warn("test3");
    //     this.name = communicationemit;
    //   }
    // });
    this.communication.GetMicrosoftUser().subscribe(a => this.name = a);
  }

}
