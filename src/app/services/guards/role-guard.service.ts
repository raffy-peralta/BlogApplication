import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {


  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this._authService.decode(); 
    console.log(2);
    //  console.log(user + "=" + next.data.role)
    if (user === next.data.role) {
      console.log("pumapasok");
      
      // console.log("role is: "+next.data.role);
      console.log("user is " + user);
      
      return true;
    }

    // navigate to not found page
    this._router.navigate(['/login']);
    return false;
  }

}