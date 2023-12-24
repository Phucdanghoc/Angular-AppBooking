import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Router, RouterOutlet } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, AuthComponent]
})
export class AppComponent implements OnInit {

  isAuth$: boolean | undefined;
  role : string | undefined ;
  constructor(private appService: AppService,private router : Router) { }
  ngOnInit(): void {
    this.isAuth();
    this.role = this.appService.ROLE;
  }
  async isAuth(): Promise<void> {
    this.appService.isAuth().subscribe((isAuthenticated: any) => {
      if (isAuthenticated) {
        this.isAuth$ = isAuthenticated
      } else {
        return;
      }
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });

  }
}
