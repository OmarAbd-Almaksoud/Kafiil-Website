import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  get userState(): boolean {
    return localStorage.getItem('user') != 'null' ? true : false;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userState) {
      return true;
    } else {
      alert('من فضلك قم بالتسجيل اولا للدخول الي هذه الصفحة! !');
      this.router.navigate(['sign-in']);
      return false;
    }
  }
}
