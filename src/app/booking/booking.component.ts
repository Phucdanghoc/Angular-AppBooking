import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../dataService.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {

  isBookingInProgress: boolean = false;
  isPaymentInProgress: any;
  baggageWeight: any;
  user: any;
  flight: any;
  showBookingForm: any;
  showModal = false;
  bookResponse: any = {};
  showBookingCard = false;
  constructor(private dataService: DataService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private appSerive: AppService,
    private router: Router,
  ) { }
  subscription: any;
  flightId: any;
  selectedSeat: any;

  ngOnInit(): void {
    this.appSerive.isAuth().subscribe((isAuthenticated: any) => {
      if (isAuthenticated) {
        return;
      } else {
        this.router.navigate([`/flight`])
      }
    });
    this.route.params.subscribe(params => {
      this.flightId = params['id'];
    });
    if (!this.flightId) {
      this.router.navigate([`/flight`])
    }
    this.setUser();
    this.loadFlightDetails(this.flightId);
  }

  currentSection: any;
  changeSection(arg0: string) {
    throw new Error('Method not implemented.');
  }
  loadFlightDetails(flightId: number): void {
    this.httpClient.get(`https://localhost:7010/api/v1/flights/${flightId}`).subscribe(
      (data: any) => {
        this.flight = data;
      },
      error => {
      }
    );
  }
  selectSeat(seat: any): void {
    if (seat.isAvailable) {
      this.selectedSeat = seat;
      this.showBookingForm = true;
    } else {
      console.log('Seat is not available.');
    }
  }
  setUser(): void {
    this.user = this.appSerive.USER;
    if (!this.user) {
      this.router.navigate(['/flight'])
    }
  }
  submitBookingForm(event: Event): void {
    this.isBookingInProgress = true;
    event.preventDefault();
    let data = {
      userId: 0,
      flightId: this.flightId,
      seatId: this.selectedSeat.seatId,
      baggageWeight: this.baggageWeight,
      price: this.selectedSeat.price,
      status: "WAITING",
      user: {

      },
      flight: {


      }
    }
    console.log(this.appSerive.TOKEN);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.appSerive.TOKEN}`, // Replace with your actual token
    });
    console.log('Booking Information:', this.baggageWeight);
    console.log(this.baggageWeight, this.user, this.selectedSeat);
    this.httpClient.post(`https://localhost:7010/api/v1/user/book`, data, { headers }).subscribe(
      (data: any) => {
        console.log(data);
        this.bookResponse = data.booking;
        this.showBookingCard = true;
      },
      error => {
        console.log(error);
        this.isBookingInProgress = false;
      }
    );
  }
  makePayment() {
    this.showBookingCard = true;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.appSerive.TOKEN}`, 
    });
    this.httpClient.put(`https://localhost:7010/api/v1/user/payment/${this.bookResponse.bookingId}`,{headers}).subscribe(
      (data: any) => {
        console.log(data);
        alert('Payment success');
      },
      error => {
        console.log(error);
      }
    );
  }
  closeModal() {
    this.showModal = false;
  }
  showBooking(): any {
    this.showBookingCard = true;
  }
  selectPaymentMethod(arg0: string) {
    alert('Confirm payment by '+arg0)
  }
}
