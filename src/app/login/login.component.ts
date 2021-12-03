import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, UsernamePasswordClient } from '@azure/msal-common';
import { ApiService } from '../api.service'; 
import {Router} from '@angular/router';
import { CommunicationService } from '../communication.service';
import {User} from '../../logic/models/user'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user! : User;
  ngOnInit(): void {
    try
    {
    this.communication.GetLoginUser().subscribe( (input:User) => {
        this.user = input;
    })
    }
    catch
    {
      this.router.navigate(['profileoverview']);
    }
  }
  public model = {
    email: "",
    password: ""
  }
  constructor(private msalService: MsalService, private api : ApiService, private router:Router, private communication: CommunicationService){
  }

  async login(data : NgForm)
  {
    if (await this.api.login(this.user,this.model.password))
    {
      console.log("succesfull");
    }
    else
    {
      console.log("not succesfull");
    }
  }
}
