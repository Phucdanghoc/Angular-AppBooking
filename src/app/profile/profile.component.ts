import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private httpClient: HttpClient, private appSerive: AppService,
    private router: Router) { }
  saveChanges() {
    console.log('Changes saved!');
    this.toggleEditMode(); // Optionally, toggle edit mode after saving 
  }
  user: any;
  tickets: any = [];
  editMode: boolean = false;
  ngOnInit(): void {
    this.appSerive.isAuth().subscribe((isAuthenticated: any) => {
      if (isAuthenticated) {
        return;
      } else {
        this.router.navigate([`/flight`])
      }
    });
    this.setUser();
    this.setMyBooking();
  }
  toggleEditMode() {
    throw new Error('Method not implemented.');
  }
  setMyBooking() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.appSerive.TOKEN}`,
    });
    this.httpClient.get('https://localhost:7010/api/v1/user/FlightsByUser', { headers }).subscribe(
      (data: any) => {
        this.tickets = data
      },
      error => {
      }
    )
  }

  cancelBooking(arg0: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.appSerive.TOKEN}`,
    });

    this.httpClient.delete(`https://localhost:7010/api/v1/user/cancel-booking/${arg0}`, { headers }).subscribe(
      (data: any) => {
        console.log(data);
        alert(data.mess);
      },
      error => {
        alert('Cancel fail');
      }
    );
  }
  payment(arg0: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.appSerive.TOKEN}`,
    });
    console.log(this.appSerive.TOKEN);

    this.httpClient.put(`https://localhost:7010/api/v1/user/payment/${arg0}`, {}, { headers: headers }).subscribe(
      (data: any) => {
        alert('Payment success');
      },
      error => {
        alert('Payment fail');
      }
    );
  }
  setUser() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.appSerive.TOKEN}`,
    });
    console.log(this.appSerive.TOKEN);

    this.httpClient.get(`https://localhost:7010/api/v1/user/profile`, { headers: headers }).subscribe(
      (data: any) => {
        console.log(data);
        this.user = data;
      },
      error => {
      }
    );
  }
}
