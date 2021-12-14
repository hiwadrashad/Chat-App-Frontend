import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selling-page',
  templateUrl: './selling-page.component.html',
  styleUrls: ['./selling-page.component.scss']
})
export class SellingPageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToProfilePage()
  {
    this.router.navigate(["profileoverview"]);
  }

}
