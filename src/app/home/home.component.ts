import { CommonModule, KeyValuePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule,KeyValuePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  seat!: any ;
  constructor(private httpClient: HttpClient,private appService : AppService) { }
  date = new Date();
  tickets: any = {};
  detailsticket: any = {};
  flights: any = [];
  searchQuery!: string;

  ngOnInit(): void {
    this.loadFlight()
  }
  
  viewTicketDetails(arg0: any) {
    throw new Error('Method not implemented.');
  }
  searchFlights() {
    this.httpClient.get(`https://localhost:7010/api/v1/seat/${this.searchQuery}`).subscribe(
      (response: any) => {
        this.seat = response.seat;
        console.log(response);
      },
      (error) => {
      }
    );
  }
  loadFlight(){
    this.httpClient.get(`https://localhost:7010/api/v1/flights/getbydate/${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}`).subscribe(
      (response: any) => {
        this.flights = response.$values;
        console.log(response);
      },
      (error) => {
      }
    );
  }

}
