import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss']
})
export class HtmlEditorComponent implements OnInit {


  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: false  }

  public barChartLabels = ['2006','2007','2008','2009','2011','2012'];
  public barChartType = 'bar';
  public barChartLegend = false;

  public barChartData = 
  [
    {data: [56,59,80,81,56,55,40], label: 'Series A',lineTension: 0.4,fill:true},
    {data:[28,48,40,19,86,27,90],label: 'Series B',  lineTension: 0.4,fill:true

    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
  public loadJsFile(url: string) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }  

}
