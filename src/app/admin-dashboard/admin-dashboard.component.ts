import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/logic/models/user';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private communication: CommunicationService,private router:Router) { }
  user! : User;

  banoverview : boolean = true;

  chartoverview : boolean = false;

  async GoToChat()
  {
    this.router.navigate(['chat']);
  }
  
  ngOnInit(): void {
    try
    {
    this.communication.GetLoginUser().subscribe( (input:User) => {
        this.user = input;
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

}
