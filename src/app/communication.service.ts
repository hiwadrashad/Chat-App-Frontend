import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from 'src/logic/models/user';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private subject!: BehaviorSubject<any>;
  private usersubject!: BehaviorSubject<any>;
  constructor() { 
  }

  
  SetLoginUser(input : User)
  {
    this.usersubject = new BehaviorSubject<any>(input);
  }

  ClearLoginUser()
  {
    this.usersubject.next;
  }

  GetLoginUser(): Observable<User>
{
  return this.usersubject.asObservable();
}
  SetMicrosoftUser(message : string){
    this.subject = new BehaviorSubject<any>(message);
  }

  clearMicrosoftUser()
  {
    this.subject.next;
  }

  GetMicrosoftUser():Observable<string>
  {
       return this.subject.asObservable();
  }
}
