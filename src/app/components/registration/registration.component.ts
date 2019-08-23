import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  error: any;
  takenUsername: boolean;
  takenEmail: boolean;

  registerForm = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    confirmpass: new FormControl('', [Validators.required]),
  });

  constructor(public accountsService: AccountsService, private router: Router) { }

  ngOnInit() {
  }

  registerAccount(){
    if(!this.takenUsername && !this.takenEmail){
      let json = { name: this.registerForm.get('name').value, password: this.registerForm.get('password').value,
      username: this.registerForm.get('uname').value,role: 2,email: this.registerForm.get('email').value }
      console.log(json)
      this.accountsService.register(json).subscribe((data)=>{
        this.router.navigate(['/login']);
      });
    }
  }

  setError(status){
    this.error = status;
    return this.error;  
  }

  checkUsername(){
    this.takenUsername = false;
    this.accountsService.getJSON().subscribe((data)=>{
      data.forEach(element => {
        if(element['username'] == this.registerForm.get('uname').value){
          this.takenUsername = true;
          this.registerForm.invalid
        }
      });
    });
  }

  checkEmail(){
    this.takenEmail = false;
    this.accountsService.getJSON().subscribe((data)=>{
      data.forEach(element => {
        if(element['email'] == this.registerForm.get('email').value){
          this.takenEmail = true;
          this.registerForm.invalid
        }
      });
    });
  }

}
