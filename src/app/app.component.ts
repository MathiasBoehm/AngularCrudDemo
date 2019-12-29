import { Component } from '@angular/core';
import { OAuthService, AuthConfig, NullValidationHandler, JwksValidationHandler } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Posts-Crud';

  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/auth/realms/crud-demo',
    redirectUri: window.location.origin + '/home',
    clientId: 'spa-crud',
    scope: 'openid profile email offline_access posts',
    responseType:'code',
    disableAtHashCheck: true,
    showDebugInformation: true
  };

  public login() {
    this.oauthService.initLoginFlow();
  }

  public logout() {
    this.oauthService.logOut();
  }

  public get name() {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims != null ? claims.given_name : null;
  }

  private configure() {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
