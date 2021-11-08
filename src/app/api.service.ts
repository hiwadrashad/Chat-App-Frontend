import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { getLocaleDateFormat } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {
   }
   getData()
   {
     let url="https://localhost:44378/api/Credentials/api/getusers"
     var returnitem = this.http.get(url);
     return this.http.get(url);
   }
}
