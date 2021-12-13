import { Component, OnInit, OnChanges,SimpleChanges,Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/logic/models/user';
import { CommunicationService } from '../communication.service';
import {Chart} from 'node_modules/chart.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnChanges {

  constructor(private communication: CommunicationService,private router:Router) { }
  user! : User;

  @Input() searchterm : string = "";

  currentlyinprofiles : boolean = true;

  currentlyingroups : boolean = false;

  currentlyinmessages : boolean = false; 

  banoverview : boolean = true;

  chartoverview : boolean = false;

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
    {data:[28,48,40,19,86,27,90],label: 'Series B',  lineTension: 0.4,fill:true},
  ];
  
  ngOnChanges(changes: SimpleChanges)
  {
    console.log(changes);
  }

  ngOnInit(): void {
    var myChart = new Chart("order-chart", {
      type: 'bar',
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
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
  public loadJsFile(url: string) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }  

}
