import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private profileDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  sendProfileData(data: any) {
    this.profileDataSubject.next(data);
  }

  getProfileData(): Observable<any> {
    return this.profileDataSubject.asObservable();
  }
}
