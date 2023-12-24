import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  loginFormVisible: boolean = true;
  registerFormVisible: boolean = false;

  // Models to store form data
  loginModel: any = {};
  registerModel: any = {};
  loginUrl = 'https://localhost:7010/api/v1/auth/';
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private appSerive: AppService
  ) { }

  async ngOnInit(): Promise<void> {
    this.appSerive.isAuth().subscribe((isAuthenticated: any) => {
      if (isAuthenticated) {
        this.home()
      } else {
        return;
      }
    });  
    this.route.queryParams.subscribe(params => {
      const mode = params['mode'];
      if (mode === 'login') {
        this.showLoginForm();
      } else if (mode === 'register') {
        this.showRegisterForm();
      }
    });
  }

  showLoginForm() {
    this.loginFormVisible = true;
    this.registerFormVisible = false;
    this.router.navigate([], { relativeTo: this.route, queryParams: { mode: 'login' }, queryParamsHandling: 'merge' });
  }

  showRegisterForm() {
    this.loginFormVisible = false;
    this.registerFormVisible = true;
    this.router.navigate([], { relativeTo: this.route, queryParams: { mode: 'register' }, queryParamsHandling: 'merge' });
  }
  login() {
    console.log('Login Data:', this.loginModel);
    this.httpClient.post(this.loginUrl + `login`, this.loginModel)
      .subscribe(
        (response: any) => {
          alert("Login Success !")
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          const token = localStorage.getItem('token');
          console.log(token);
          this.home()
        },
        (error) => {
          alert("Login Fail !");
        }
      );
  }

  register() {
    console.log('Registration Data:', this.registerModel);
  }
  home() {
    this.router.navigateByUrl('/home'); // Redirect to the home route ("/") without query parameters
  }

}
