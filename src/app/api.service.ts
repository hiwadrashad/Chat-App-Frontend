import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { getLocaleDateFormat } from '@angular/common';
import {User} from'../logic/models/user'
import { catchError, map } from 'rxjs/operators';
import { isObservable, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { GroupChat } from 'src/logic/models/groupchat';
import { GeneralChat } from 'src/logic/models/generalchat';
import { SingleUserChat } from 'src/logic/models/singleuserchat';
import { Message } from 'src/logic/models/message';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public user! : User;
  public loginsuccesfull! : boolean;
  public jwttoken! : any;
  public loginsuccesfulldataaplied! : boolean;
  public currentusergroupchats! : GroupChat[];
  public currentusergeneralchats! : GeneralChat[];
  public currentusersingleuserchats! : SingleUserChat[];

  constructor(private http:HttpClient) {
   this.user = {} as User
  }
   getAllUsers()
   {
     var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
     let url="https://localhost:44378/api/Credentials/api/getusers"
     return this.http.get(url,header);
   }

   getUsersByEmailAdress(email: string)
   {
    var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
    var url=`https://localhost:44378/api/Credentials/api/getusersbyemail/${encodeURI(email)}`
    return this.http.get(url,header)
   }

   getUserById(id : number)
   {
    var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
    var url=`https://localhost:44378/api/Credentials/api/getuserbyid/${id}`
    return this.http.get(url,header)
   }

   async waitFor(prom: Promise<any> | Observable<any>): Promise<any> {
    if (isObservable(prom)) {
      prom = prom.pipe(take(1)).toPromise();
    }
    const macroTask = Zone.current
      .scheduleMacroTask(
        `WAITFOR-${Math.random()}`,
        () => { },
        {},
        () => { }
      );
    return prom.then((p: any) => {
      macroTask.invoke();
      return p;
    });
  }
  
async login (user : User, password : string)
   {
    var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
    var url=`https://localhost:44378/api/Credentials/api/login/${encodeURI(password)}`;
    await this.http.post<any>(url, user,header).toPromise()
    .then(a => {this.loginsuccesfull = true; this.jwttoken = a})
    .catch(a => {this.loginsuccesfull = false; this.jwttoken = null});

  return this.loginsuccesfull;
}

async getgroupchatsbyuserid (id : Number)
   {
    var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
    var url=`https://localhost:44378/api/Group/api/getgroupchatsbyuserid/${id}`;
    await this.http.get<any>(url,header).toPromise()
    .then(a => {this.currentusergroupchats = a})
    .catch(a => {});
       
  return this.currentusergroupchats;
}

async getgeneralchatswithidcredentialsparameter(id : Number)
{
  var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
  var url=`https://localhost:44378/api/Group/api/getgeneralchat/${id}`;
  await this.http.get<any>(url,header).toPromise()
  .then(a => {this.currentusergeneralchats = a})
  .catch(a => {});     
   return this.currentusergeneralchats;
}

async getsingleuserchatsbyuserid(id : Number)
{
  var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
  var url=`https://localhost:44378/api/Group/api/getsingleuserchatbyuserid/${id}`;
  await this.http.get<any>(url,header).toPromise()
  .then(a => {this.currentusersingleuserchats = a})
  .catch(a => {});     
   return this.currentusersingleuserchats;
}

async addmessagetogeneralchat(user: User,groupid : number, message : string)
{
  let date = new Date();
  const messagetosend = {} as Message;
  messagetosend.startDate = date;
  messagetosend.endDate = date;
  messagetosend.text = message;
  messagetosend.user = user;
  var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
  var url=`https://localhost:44378/api/Chat/api/addmessagetogeneralchat/${groupid}`;
  await this.http.put<any>(url, messagetosend,header).toPromise()
  .then()
  .catch();    
  var urlget=`https://localhost:44378/api/Group/api/getgeneralchat/${groupid}`;
  await this.http.get<any>(urlget,header).toPromise()
  .then(a => {this.currentusergeneralchats = a})
  .catch(a => {});
   return this.currentusergeneralchats;
}

async addmessagetosingleuserchat(user: User,groupid : number, message : string)
{
  let date = new Date();
  const messagetosend = {} as Message;
  messagetosend.startDate = date;
  messagetosend.endDate = date;
  messagetosend.text = message;
  messagetosend.user = user;
  var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
  var url=`https://localhost:44378/api/Chat/api/addmessagetosingleuserchat/${groupid}`;
  await this.http.put<any>(url, messagetosend,header).toPromise()
  .then()
  .catch();    
  var urlget=`https://localhost:44378/api/Group/api/getsingleuserchatbyuserid/${groupid}`;
  await this.http.get<any>(urlget,header).toPromise()
  .then(a => {this.currentusersingleuserchats = a})
  .catch(a => {});
   return this.currentusersingleuserchats;
}


async addmessagetogroupchat(user: User,groupid : number, message : string)
{
  let date = new Date();
  const messagetosend = {} as Message;
  messagetosend.startDate = date;
  messagetosend.endDate = date;
  messagetosend.text = message;
  messagetosend.user = user;
  var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
  var url=`https://localhost:44378/api/Chat/api/addmessagetogroupchat/${groupid}`;
  await this.http.put<any>(url, messagetosend,header).toPromise()
  .then()
  .catch();    
  var urlget=`https://localhost:44378/api/Group/api/getgroupchatsbyuserid/${groupid}`;
  await this.http.get<any>(urlget,header).toPromise()
  .then(a => {this.currentusergroupchats = a})
  .catch(a => {});
   return this.currentusergroupchats;
}
}


