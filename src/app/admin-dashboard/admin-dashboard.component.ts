import { Component, OnInit, OnChanges,SimpleChanges,Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/logic/models/user';
import { CommunicationService } from '../communication.service';
import {Chart} from 'node_modules/chart.js';
import { Message } from 'src/logic/models/message';
import { GeneralChat } from 'src/logic/models/generalchat';
import { SingleUserChat } from 'src/logic/models/singleuserchat';
import { GroupChat } from 'src/logic/models/groupchat';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor( private api : ApiService,private communication: CommunicationService,private router:Router) { }
  user! : User;

  searchterm : string = "";

  currentlyinprofiles : boolean = false;

  currentlyingroups : boolean = false;

  currentlyinmessages : boolean = true; 

  banoverview : boolean = true;

  chartoverview : boolean = false;

  allmessages : Message[] = [];

  filteredmessages : Message[] = [];

  allusers : User[] = [];

  filteredusers : User[] = [];

  allgeneralchats : GeneralChat[] = [];

  filteredgeneralchats : GeneralChat[] = [];

  allsingleuserchats : SingleUserChat[] = [];

  filteredsingleuserchats : SingleUserChat[] = [];

  allgroupchats : GroupChat[] = [];

  filteredgroupchats : GroupChat[] = [];

  totalusercount : number = 0;

  totalgroupcount : number = 0;

  totalmessagecount : number = 0;

  JanuaryAverageRegister : number = 0;

  AprilAverageRegister : number = 0;

  JuneAverageRegister : number = 0;

  AugustAverageRegister : number = 0;

  OctoberAverageRegister : number = 0;

  DecemberAverageRegister : number = 12;

  async GoToChat()
  {
    this.router.navigate(['chat']);
  }

  

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: false,
    
    }

  public barChartLabels = ['March','April','June','August','October','December'];
  public barChartType = 'bar';
  public barChartLegend = false;

  public barChartData = 
  [ 
    {data:[this.JanuaryAverageRegister,this.AprilAverageRegister ,this.JuneAverageRegister ,this.AugustAverageRegister ,this.OctoberAverageRegister ,this.DecemberAverageRegister],label: 'Series B',  lineTension: 0.4,fill:true},
  ];
  
  ExecuteSearchValue()
  {
    if (this.searchterm == "")
    {
      this.filteredusers = this.allusers;
      this.filteredmessages = this.allmessages;
      this.filteredgroupchats = this.allgroupchats;
      this.filteredsingleuserchats = this.allsingleuserchats;
      this.filteredgeneralchats = this.allgeneralchats;
    }
    else
    {
      if (this.currentlyinmessages)
      {
        this.filteredmessages = this.allmessages.filter(a => a.text.includes(this.searchterm) || a.user.email.includes(this.searchterm) 
        || a.user.username.includes(this.searchterm) || a.user.name.includes(this.searchterm));
      }
      if (this.currentlyinprofiles)
      {
        this.filteredusers = this.allusers.filter(a => a.email.includes(this.searchterm) 
        || a.username.includes(this.searchterm) || a.name.includes(this.searchterm));
      }
      if (this.currentlyingroups)
      {
        this.filteredgroupchats = this.allgroupchats.filter(a => a.title.includes(this.searchterm) || a.groupOwner.email.includes(this.searchterm) 
        || a.groupOwner.username.includes(this.searchterm) || a.groupOwner.name.includes(this.searchterm));
        this.filteredgeneralchats = this.allgeneralchats.filter(a => a.title.includes(this.searchterm) || a.owner.email.includes(this.searchterm) 
        || a.owner.username.includes(this.searchterm) || a.owner.name.includes(this.searchterm));
        this.filteredsingleuserchats = this.allsingleuserchats.filter(a => a.title.includes(this.searchterm) || a.originUser.email.includes(this.searchterm) 
        || a.originUser.username.includes(this.searchterm) || a.originUser.name.includes(this.searchterm));
      }
    }
  }

  async ngOnInit(): Promise<void> {
    try
    {
    this.communication.GetLoginUser().subscribe( (input:User) => {
        this.user = input;
    });
    this.allusers =  await this.api.getusers(this.user.id);
    this.allmessages = await this.api.getallmessages(this.user.id);
    this.allgroupchats = await this.api.getallgroupchats(this.user.id);
    this.allsingleuserchats = await this.api.getallsingleuserchats(this.user.id);
    this.allgeneralchats = await this.api.getallgeneralchats(this.user.id);
    this.filteredusers = this.allusers;
    this.filteredmessages = this.allmessages;
    this.filteredgroupchats = this.allgroupchats;
    this.filteredsingleuserchats = this.allsingleuserchats;
    this.filteredgeneralchats = this.allgeneralchats;
    this.totalusercount = this.allusers.length;
    this.totalmessagecount = this.allmessages.length;
    this.totalgroupcount = this.allgeneralchats.length + this.allgroupchats.length + this.allsingleuserchats.length;
    this.allgroupchats.forEach((element) => {
    if (element.creationDate.getMonth() == 0 || 1)
    {
      this.JanuaryAverageRegister = this.JanuaryAverageRegister + 1;
    }
    if (element.creationDate.getMonth() == 2 || 3)
    {
      this.AprilAverageRegister = this.AprilAverageRegister + 1;
    }    if (element.creationDate.getMonth() == 4 || 5)
    {
      this.JuneAverageRegister = this.JuneAverageRegister + 1;
    }    if (element.creationDate.getMonth() == 6 || 7)
    {
      this.AugustAverageRegister = this.AugustAverageRegister + 1;
    }    if (element.creationDate.getMonth() == 8 || 9)
    {
      this.OctoberAverageRegister = this.OctoberAverageRegister + 1;
    }    if (element.creationDate.getMonth() == 10 || 11 || 12)
    {
      this.DecemberAverageRegister = this.DecemberAverageRegister + 1;
    }
    });
    if (this.user.role != 0)
    {
            //this.router.navigate(['profileoverview']);
            this.router.navigate(['admindashboard']);
    }
    }
    catch
    {
      //this.router.navigate(['profileoverview']);
      this.router.navigate(['admindashboard']);
    }
  }
  public loadJsFile(url: string) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }  

}
