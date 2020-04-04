# NgAuthentication

## Install
Run `npm i ng-authentication`

## Usage

Import NgAuthentication to your AppModule
```
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgAuthenticationModule.forRoot({
      apiKey: 'Your Google Maps API key'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

Define options for your map
```
this.mapOptions = {
  center: '',
  zoom: '',
  olmap: {
    ...
  },
  gmap: {
    ...
  }
}
```

Your template look like
```
<ng-authentication [options]="mapOptions"></ng-authentication>
```

## Built-in

### Directive
- isCurrentUser
- isAuthenticated

### Service
- login

