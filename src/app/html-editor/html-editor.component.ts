import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss']
})
export class HtmlEditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadJsFile("Chat-App-MSAL/src/assets/dashboard/vendors/js/vendor.bundle.base.js");
    this.loadJsFile("Chat-App-MSAL/src/assets/dashboard/vendors/chart.js/Chart.min.js");
    this.loadJsFile("Chat-App-MSAL/src/assets/dashboard/vendors/datatables.net/jquery.dataTables.js");
    this.loadJsFile("Chat-App-MSAL/src/assets/dashboard/vendors/datatables.net-bs4/dataTables.bootstrap4.js");
    this.loadJsFile("Chat-App-MSAL/src/assets/dashboard/vendors/js/dataTables.select.min.js");
    this.loadJsFile("Chat-App-MSAL/src/assets/dashboard/vendors/js/off-canvas.js");
    this.loadJsFile("Chat-App-MSAL/src/assets/dashboard/vendors/js/template.js");
    this.loadJsFile("Chat-App-MSAL/src/assets/dashboard/vendors/js/settings.js");
    this.loadJsFile("Chat-App-MSAL/src/assets/dashboard/vendors/js/todolist.js");
    this.loadJsFile("Chat-App-MSAL/src/assets/dashboard/vendors/js/dashboard.js");
    this.loadJsFile("Chat-App-MSAL/src/assets/dashboard/vendors/js/Chart.roundedBarCharts.js");

  }
  public loadJsFile(url: string) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }  

}
