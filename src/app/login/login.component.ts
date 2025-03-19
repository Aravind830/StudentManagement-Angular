import { Component, EventEmitter, Output } from '@angular/core';
import { login } from '../Interface/login.interface';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private apiServ: ApiServiceService, private rout: Router) {
  }

  user: login = {
    username: '',
    password: '',
    confirmPassword: ''
  }

  users: login[] = [];
  isLogged = true;
  msg: string = '';
  passMisMatch: string = '';

  @Output() logg = new EventEmitter<any>();

  onSign() {
    this.isLogged = !this.isLogged;
  }

  onBack() {
    this.isLogged = !this.isLogged;
  }

  onRegister() {
    debugger
    if (this.user.password !== this.user.confirmPassword) {
      this.passMisMatch = "Please Enter Same password..!"
    } else {
      // localStorage.setItem("Registered", JSON.stringify(this.user));
      this.apiServ.register(this.user).subscribe(success => {
        if (success)
          alert("Registered SuccessFully.!");
        else
          alert("User Already Exists.!");
      })
      this.isLogged = true;
      this.user.username = '';
      this.user.password = '';
      this.rout.navigate(['/login']);
    }
  }

  onLog() {
    debugger
    this.isLogged = true;
    // const u = localStorage.getItem("Registered");
    this.apiServ.getAll().subscribe(value => {
      this.users = value;
      console.log(value);
      console.log(this.users);
      if (this.users.some(u => u.username === this.user.username && u.password === this.user.password)) {
        // alert("Logged Successfully..!");
        this.logg.emit(this.isLogged);
        this.rout.navigate(['/student']);
      } else {
        alert("Invalid Credentials..!");
        this.rout.navigate(['/login']);
      }
      this.user.username = '';
      this.user.password = '';
    });
  }

  logged(): boolean {
    return true;
  }
}
