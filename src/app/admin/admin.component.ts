import { CommonModule, Time } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  constructor(private httpClient: HttpClient,private appSerive : AppService,private router : Router) { }
  ngOnInit(): void {
    if (this.appSerive.ROLE !== "Admin") {
      this.router.navigate(['/home']);
    }
    this.loadCities();
    this.loadFlight();
  }

  flights: any = {};
  departingDate!: Date;
  time!: Time;
  travelClass!: string;
  airplane!: string;
  distanceid!: number;
  flyingFromOptions: any[] = [];
  addNewFlight() {
    const currentDate = new Date();
    const sevenDaysLater = new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000);
    let oneWeekInMilliseconds = 5 * 24 * 60 * 60 * 1000;
    let isOneWeekApart = Math.abs(sevenDaysLater.getTime() - new Date(this.departingDate).getTime()) <= oneWeekInMilliseconds;
    console.log(sevenDaysLater.getTime(), new Date(this.departingDate).getTime());

    if (isOneWeekApart) {

      let data = {
        flightNumber: "",
        departureTime: new Date(this.formattedDateTime(this.departingDate, this.time)),
        arrivalTime: new Date(this.formattedDateTime(this.departingDate, this.time)),
        airplane: this.airplane,
        FlightDistanceId: this.distanceid,
        seats: [
        ]
      }
      console.log(data);
      this.httpClient.post(`https://localhost:7010/api/v1/flights`, data).subscribe(
        (response: any) => {
          window.alert(`Created ${response.flightNumber} Flight`);
        },
        (error) => {
          window.alert(`${error.message}`);
        }
      );
    }
    else {
      window.alert(`Flights need to be created 5 day in advance`);
    }

  }
  loadCities() {
    this.httpClient.get(`https://localhost:7010/api/v1/distances`).subscribe(
      (response: any) => {
        this.flyingFromOptions = response.$values;
        console.log(this.flyingFromOptions);

      },
      (error) => {
        console.log(error.message);
      }
    );
  }
  loadFlight() {
    this.httpClient.get(`https://localhost:7010/api/v1/flights`).subscribe(
      (response: any) => {
        this.flights = response.$values;
        console.log(response);

      },
      (error) => {
        console.log(error.message);
      }
    );
  }
  formattedDateTime(departingDate: any, time: any) {
    console.log(departingDate, time);

    const combinedDateTimeString = `${departingDate} ${time}`;
    const combinedDateTime = new Date(combinedDateTimeString);
    return (combinedDateTime);
  }

}
