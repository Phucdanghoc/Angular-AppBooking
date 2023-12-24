import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = 'https://localhost:7010/api/v1/user/profile';
  USER : any ;
  TOKEN: any;
  ROLE: any ;
  constructor(private httpClient: HttpClient) { }
  private validateToken(token: string): Observable<boolean> {
    this.TOKEN = token;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(this.apiUrl, { headers }).pipe(
      tap(response => this.USER = response),
      map(() => true), // Token is valid
      catchError(() => of(false)) // Token is invalid
    );
  }
  
  isAuth(): Observable<boolean> {
    try {
      if (typeof localStorage === 'undefined') {
        return of(false);
      }
      
      const token = localStorage.getItem('token');
      this.ROLE = localStorage.getItem('role');
      if (!token) {
        return of(false); 
      }
      return this.validateToken(token);
    } catch (error) {
      console.error('Error checking token validity:', error);
      return of(false);
    }
  }
}
