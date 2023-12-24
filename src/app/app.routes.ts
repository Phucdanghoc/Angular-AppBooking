import { Routes } from '@angular/router';
import { FlightComponent } from './flight/flight.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingComponent } from './booking/booking.component';

export const routes: Routes = [
    { path: 'flight', component: FlightComponent },
    { path: 'auth', component: AuthComponent },
    {path : 'home', component : HomeComponent},
    {path : 'admin', component : AdminComponent},
    {path : 'profile', component : ProfileComponent},
    {path : 'booking/:id', component : BookingComponent},
    {path : 'booking', redirectTo: '/flight', pathMatch: 'full'},
    { path: '', redirectTo: '/auth?mode=login', pathMatch: 'full' } // Default route

];
