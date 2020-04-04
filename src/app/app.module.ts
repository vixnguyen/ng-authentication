import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgAuthenticationModule } from 'ng-authentication';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgAuthenticationModule.forRoot({
      authProvider: environment.authProvider,
      loginUri: 'login'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
