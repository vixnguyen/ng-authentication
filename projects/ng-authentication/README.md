# NgAuthentication

## Install
Run `npm i ng-authentication`

## Built-in

### Directives
- isCurrentUser
- isAuthenticated
- userRole

### Services
- signInWithLink
- signOut
- isAuthenticated
- isCurrentUser
- getUserInfo

## Usage

### Import NgAuthentication to your AppModule
```TypeScript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgAuthenticationModule.forRoot({
      authProvider: environment.authProvider,
      loginUri: 'signInWithLink'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```


### Directives
#### 1. isAuthenticated
1.1 Check & display content in case user is authenticated only
```html
<!-- Shorthand -->
<ng-template isAuthenticated>
  <h1>Welcome user!</h1>
</ng-template>
```
Or
```html
<ng-template isAuthenticated>
  <h1 * >Welcome user!</h1>
</ng-template>
```

1.2 Check & display content in both cases user is authenticated and not
```html
<ng-template isAuthenticated>
  <h1 * >Welcome user!</h1>
  <button * class="btn">Please sign in!</button>
</ng-template>
```

1.3 Check & display content in case user is not authenticated only
```html
<ng-template isAuthenticated>
  <ng-template></ng-template>
  <button * class="btn">Please sign in!</button>
</ng-template>
```

#### 2. isCurrentUser
2.1 Check & display content in case of right condition only
```html
<!-- Shorthand -->
<ng-template [isCurrentUser]="'vix'">
  <h1>It me ¯\_(ツ)_/¯</h1>
</ng-template>
```
Or
```html
<ng-template [isCurrentUser]="'vix'">
  <h1 * >It me ¯\_(ツ)_/¯</h1>
</ng-template>
```

2.2 Check & display content in both cases right and wrong condition
```html
<ng-template [isCurrentUser]="'vix'">
  <h1 * >It me ¯\_(ツ)_/¯</h1>
  <button * class="btn">Who are you?</button>
</ng-template>
```

2.3 Check & display content in case of wrong condition
```html
<ng-template [isCurrentUser]="'vix'">
  <ng-template></ng-template> <!-- Define the right condition with empty content -->
  <button * class="btn">Who are you?</button>
</ng-template>
```

#### 3. userRole
```html
<!-- Shorthand -->
<ng-template userRole>
  <button [userRoleIs]="'admin'" class="btn">Remove</button>
</ng-template>
```

### Services
Inject NgAuthenticationService into AppComponent in case you want to use some methods of this service
```
export class AppComponent {

  constructor(
    @Inject(NgAuthenticationService) private auth: NgAuthenticationService
  ) {}

}
```
