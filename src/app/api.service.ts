import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { getLocaleDateFormat } from '@angular/common';
import {User} from'../logic/models/user'
import { catchError, map } from 'rxjs/operators';
import { isObservable, Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public user! : User;
  public loginsuccesfull! : boolean;
  public jwttoken! : any;
  public loginsuccesfulldataaplied! : boolean;
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
  
login (user : User, password : string)
   {
    var header = {headers : new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzY0NTQ5NTcsImV4cCI6MTY2Nzk5MDk1NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.zf5pNDjPjLVmhk82LajY_tjpRAiw11nEv_iWUEBOcXo')}
    var url=`https://localhost:44378/api/Credentials/api/login/${encodeURI(password)}`;
   this.http.post<any>(url, user,header)
    .subscribe({
      next: data => {
          this.loginsuccesfull = true;
          this.jwttoken = data;
          this.loginsuccesfulldataaplied = true;
      },
      error: error => {
          this.loginsuccesfulldataaplied = true;
          this.loginsuccesfull = false;
          this.jwttoken = null;
      }
    });
   
  return this.loginsuccesfull;
}
}
