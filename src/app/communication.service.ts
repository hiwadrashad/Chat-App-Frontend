import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private subject!: BehaviorSubject<any>;
  constructor() { 
  }

  

  SetMicrosoftUser(message : string){
    this.subject = new BehaviorSubject<any>(message);
  }

  clearMicrosoftUser()
  {
    this.subject.next;
  }

  GetMicrosoftUser():Observable<string>{
       return this.subject.asObservable();
  }
}
