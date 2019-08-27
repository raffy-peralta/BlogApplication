import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountsService } from '../../services/accounts/accounts.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  accounts: Observable<String>;
  error: boolean;
  loginForm = new FormGroup({
    uname: new FormControl('', Validators.required),
    password: new FormControl('',Validators.required),
  });

  email = new FormControl('');
  constructor(public accountService: AccountsService,private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
 

  loginAccount() : void{
    // console.log(this.loginForm.get('uname'));
      this.accountService.getJSON().subscribe(accounts => { this.accounts = accounts.users
        accounts.forEach(element => {
          let json = {"name": element.name, "username": element.username, "email": element.email, 
          "role": element.role, "id": element.id};
          if(element.username == this.loginForm.get('uname').value && element.password == 
          this.loginForm.get('password').value){
            console.log("true")
            if(element.role == 1){
              this.authService.loginAdmin(json);
            }else if(element.role == 2){
              this.authService.login(json);
            }
            this.error = false;
            
          }else{
            console.log("false");
            this.error = true;
          }

        });
      });
  }


}
