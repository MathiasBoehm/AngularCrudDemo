import { CanActivate , ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({ providedIn: 'root'})
export class LoginGuard implements CanActivate {

    constructor(private oauthService: OAuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let granted = this.isAuthenticated();
        if (!granted) {
            window.alert('Please log in');
        }
        return granted;
    }

    private isAuthenticated() : boolean {
        let claims: any = this.oauthService.getIdentityClaims();
        return claims != null;
      }
}
