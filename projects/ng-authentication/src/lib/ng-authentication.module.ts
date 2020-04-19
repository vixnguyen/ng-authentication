import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { NgAuthenticationService, AUTH_MODULE_CONFIG } from './ng-authentication.service';
import { IsAuthenticatedDirective } from './is-authenticated.directive';
import { IsCurrentUserDirective } from './is-current-user.directive';
import { UserRoleDirective, UserRoleIsDirective } from './user-role.directive';

const DIRECTIVES = [
  IsAuthenticatedDirective,
  IsCurrentUserDirective,
  UserRoleDirective,
  UserRoleIsDirective
];

@NgModule({
  declarations: [
    ...DIRECTIVES
  ],
  exports: [
    ...DIRECTIVES
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {}
    })
  ]
})
export class NgAuthenticationModule {
  static forRoot(config: any): ModuleWithProviders {
    return {
      ngModule: NgAuthenticationModule,
      providers: [
        NgAuthenticationService,
        {
          provide: AUTH_MODULE_CONFIG,
          useValue: config
        }
      ]
    };
  }

  static forChild() {
    return {
      ngModule: NgAuthenticationModule,
      providers: [
        NgAuthenticationService
      ]
    };
  }
}

export * from './ng-authentication.service';
