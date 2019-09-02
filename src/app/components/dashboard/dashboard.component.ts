import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(private authService: AuthService, private router: Router) { }
  id: number;
  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('details')).role;
    // console.log(this.id);
    if(this.id == 1){
      this.router.navigate(['/dashboard/blogs']);
    }else if(this.id == 2){
      this.router.navigate(['/dashboard/home']);
    }


  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
