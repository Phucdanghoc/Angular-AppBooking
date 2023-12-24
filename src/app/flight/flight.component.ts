import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { DataService } from '../dataService.component';

@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent implements OnInit {

  @Output() sendData: EventEmitter<any> = new EventEmitter<any>();

  formData: any = {};
  flights: any = {};
  flyingFromOptions: any = [];

  showForm: boolean = true;
  distanceId: any;
  constructor(
    private httpClient: HttpClient,
    private appSerive: AppService,
    private dataService: DataService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.loadCities()
  }
  flyingFrom!: string;
  flyingTo!: string;
  flyingInDate!: Date;
  travelClass!: string;
  showFlights() {
    // ...
    let data = {
      distanceId: this.distanceId,
      flyingFrom: this.flyingFrom,
      flyingTo: this.flyingTo,
      flyingInDate: this.flyingInDate,
      travelClass: this.travelClass,
    }
    console.log(data);
    this.getFlights();
  }
  toggleView(data: any) {

    this.formData = data;
    this.showForm = !this.showForm;
  }

  async getFlights() {
    this.httpClient.get(`https://localhost:7010/api/v1/flights/search?distanceId=${this.distanceId}&date=${this.flyingInDate}`).subscribe(
      (response: any) => {
        console.log(response);
        this.flights = response.$values;
      },
      (error) => {
        this.flights = [];
      }
    );
  }
  loadCities() {
    this.httpClient.get(`https://localhost:7010/api/v1/distances`).subscribe(
      (response: any) => {
        console.log(response);
        this.flyingFromOptions = response.$values;
      },
      (error) => {
        this.flyingFromOptions = [];
      }
    );
  }
  back() {
  }

  async bookFlight(flightId: any) {
    this.appSerive.isAuth().subscribe((isAuthenticated: any) => {
      if (isAuthenticated) {
        this.router.navigate(['/booking',flightId])
      } else {
        alert("Login to book")
      }
    });
  }
}
