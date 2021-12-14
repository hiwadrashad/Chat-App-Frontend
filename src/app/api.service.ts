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
import { TempGroup } from 'src/logic/models/tempgroup';
import { AddGroupChatModalComponent } from './add-group-chat-modal/add-group-chat-modal.component';
import { TempSingle } from 'src/logic/models/tempsingle';


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
  public users! : User[];
  public succesfullpasswordinputgroupchat : boolean = false;
  public messages : Message[] = [];
  public singleuserchat : SingleUserChat[] = [];
  public generalchats : GeneralChat[] = [];
  public groupchats : GroupChat[] = [];

  constructor(private http:HttpClient) {
   this.user = {} as User
  }
   async getAllUsers()
   {
     var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
     let url="https://localhost:44378/api/Credentials/api/getusers"
     return await this.http.get(url,header);
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

async getusers(requestingid : number)
{
  var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
  var url=`https://localhost:44378/api/Credentials/api/getusers/${requestingid}`;
  await this.http.get<any>(url,header).toPromise()
  .then(a => {this.users = a})
  .catch(a => {});     
   return this.users;
}

async addsingleuserchat(user : User, input : TempSingle)
{
  let date = new Date();
  const group = {} as SingleUserChat;
  group.title = input.title;
  group.creationDate = date;
  group.originUser = input.senderuser;
  group.recipientUser = input.recipientuser;
  group.private = input.private;
  var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
  var url=`https://localhost:44378/api/Group/api/addsingleuserchat/${encodeURI(input.password)}`;
  await this.http.post<any>(url, group,header).toPromise()
  .then()
  .catch();  
  var urlget=`https://localhost:44378/api/Group/api/getsingleuserchatbyuserid/${user.id}`;
  await this.http.get<any>(urlget,header).toPromise()
  .then(a => {this.currentusersingleuserchats = a})
  .catch(a => {});
  return this.currentusersingleuserchats;
}

async addgroupchat(user : User,input : TempGroup)
{
  let date = new Date();
  const group = {} as GroupChat;
 group.title = input.title;
  group.creationDate = date;
  group.users = input.users;
  group.groupOwner = user;
  group.chatBanned = false;
  group.maxAmountPersons = input.userlimit;
  group.private = input.private;
  var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
  var url=`https://localhost:44378/api/Group/api/addgroupchat/${encodeURI(input.password)}`;
  await this.http.post<any>(url, group,header).toPromise()
  .then()
  .catch();  
  var urlget=`https://localhost:44378/api/Group/api/getgroupchatsbyuserid/${user.id}`;
  await this.http.get<any>(urlget,header).toPromise()
  .then(a => {this.currentusergroupchats = a})
  .catch(a => {});
   return this.currentusergroupchats;
}

async logingroupchat(password: string,group: GroupChat)
{
  var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
  var url=`https://localhost:44378/api/Group/api/logingroupchat/${encodeURI(password)}`;
  await this.http.post<any>(url, group,header).toPromise()
  .then(a => {this.succesfullpasswordinputgroupchat = true})
  .catch(a => {this.succesfullpasswordinputgroupchat = false});  
   return this.succesfullpasswordinputgroupchat;
}

async getallmessages(userid : Number)
{
  var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
  var urlget=`https://localhost:44378/api/Chat/api/getmessages/${userid}`;
  await this.http.get<any>(urlget,header).toPromise()
  .then(a => {this.messages = a})
  .catch(a => {});
   return this.messages;
}

async getallusers(userid : Number)
{
  var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
  var urlget=`https://localhost:44378/api/Credentials/api/getallusers/${userid}`;
  await this.http.get<any>(urlget,header).toPromise()
  .then(a => {this.users = a})
  .catch(a => {});
   return this.users;
}

async getallgroupchats(userid : Number)
{
  var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
  var urlget=`https://localhost:44378/api/Group/api/getgroupschat/${userid}`;
  await this.http.get<any>(urlget,header).toPromise()
  .then(a => {this.groupchats = a})
  .catch(a => {});
   return this.groupchats;
}
async getallsingleuserchats(userid : Number)
{
  var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
  var urlget=`https://localhost:44378/api/Group/api/getsingleuserchat/${userid}`;
  await this.http.get<any>(urlget,header).toPromise()
  .then(a => {this.singleuserchat = a})
  .catch(a => {});
   return this.singleuserchat;
}
async getallgeneralchats(userid : Number)
{
  var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
  var urlget=`https://localhost:44378/api/Group/api/getgeneralchat/${userid}`;
  await this.http.get<any>(urlget,header).toPromise()
  .then(a => {this.generalchats = a})
  .catch(a => {});
   return this.generalchats;
}
}


