import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountsService } from '../../services/accounts/accounts.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  constructor(public accountService: AccountsService,private router: Router) { }

  ngOnInit() {
  }
 

  loginAccount() : void{
    // console.log(this.loginForm.get('uname'));
      this.accountService.getJSON().subscribe(accounts => { this.accounts = accounts.users
        accounts.forEach(element => {
          if(element.username == this.loginForm.get('uname').value && element.password == 
          this.loginForm.get('password').value){
            console.log("true")
            this.router.navigate(['home']);
            this.error = false;
            
          }else{
            console.log("false");
            this.error = true;
          }

        });
      });
  }


}
