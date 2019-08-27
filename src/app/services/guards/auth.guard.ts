import { AuthService } from './../auth/auth.service'
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthenticated()) {
        return true;
    }
        if(this.authService.decode().toString() === `2`){
          this._router.navigate(['/dashboard']);
          // console.log('2')
        }else if(this.authService.decode().toString() === `1`){
          this._router.navigate(['/admin']);
          // console.log('1')
        }
        
        // navigate to login page
        // this._router.navigate(['/home']);
        // you can save redirect url so after authing we can move them back to the page they requested
        return false;
    

   
  }

}