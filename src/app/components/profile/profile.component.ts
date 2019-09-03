import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountsService } from 'src/app/services/accounts/accounts.service';

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
  error: boolean;
  id: any;
  constructor(private modalService: NgbModal, private accountsService: AccountsService) { }
  changePassForm: any;
  ngOnInit() {
    this.name = JSON.parse(localStorage.getItem('details')).name;
    this.email = JSON.parse(localStorage.getItem('details')).email;
    this.role = JSON.parse(localStorage.getItem('details')).role;
    this.username = JSON.parse(localStorage.getItem('details')).username;
    this.id = JSON.parse(localStorage.getItem('details')).id;
    this.changePassForm = new FormGroup({
      password: new FormControl('', [Validators.minLength(6), Validators.required]),
      confirmpass: new FormControl('', Validators.required)
    });
  }
  
  setError(status){
    this.error = status;
    return this.error;  
  }

  savePass(){
    if(this.changePassForm.valid && this.changePassForm.get('password').value == this.changePassForm.get('confirmpass').value){
      let json = {
        name: this.name,
        password: this.changePassForm.get('password').value,
        username: this.username,
        role: this.role,
        email: this.email
      }
      this.accountsService.updateProfile(json, this.id).subscribe((data)=>{
        this.changePassForm.reset();
        this.modalService.dismissAll();
      });
      
    }
  }

  openModalChange(content) {
    this.changePassForm.reset();
    this.modalService.open(content, { size: 'lg' });
  }

}
