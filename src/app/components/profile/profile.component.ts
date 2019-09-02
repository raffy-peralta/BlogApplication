import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name: string;
  email: string;
  role: number;
  username: string;
  constructor() { }

  ngOnInit() {
    this.name = JSON.parse(localStorage.getItem('details')).name;
    this.email = JSON.parse(localStorage.getItem('details')).email;
    this.role = JSON.parse(localStorage.getItem('details')).role;
    this.username = JSON.parse(localStorage.getItem('details')).username;
  }

}
