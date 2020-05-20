# NgAuthentication

## Install
Run `npm i ng-authentication`

## Built-in

### Directives
- isCurrentUser
- isAuthenticated
- userRole

### Services
NgAuthenticationService
##### Methods
- signInWithLink
- signOut
- isAuthenticated
- isCurrentUser
- userRole
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
##### isAuthenticated
Display content in case user is authenticated
```html
<ng-template isAuthenticated>
  <h1>Welcome user!</h1>
</ng-template>
```
Or
```html
<h1 *isAuthenticated >Welcome user!</h1>
```

Check if user is authenticated or not and then display content accordingly
```html
<ng-template isAuthenticated>
  <h1 * >Welcome user!</h1> <!-- This content will be displayed if user is authenticated -->
  <button * class="btn">Please sign in!</button> <!-- This content will be displayed if not -->
</ng-template>
```

Display content in case user is unauthenticated
```html
<ng-template isAuthenticated>
  <ng-template></ng-template> <!-- Trick: Define empty content for the right condition -->
  <button * class="btn">Please sign in!</button>
</ng-template>
```

##### isCurrentUser
Display content in case logger is current user
```html
<ng-template [isCurrentUser]="'vix'">
  <h1>It me ¯\_(ツ)_/¯</h1>
</ng-template>
```
Or
```html
<h1 *isCurrentUser="'vix" >It me ¯\_(ツ)_/¯</h1>
```

Check if logger is current user or not and then display content accordingly
```html
<ng-template [isCurrentUser]="'vix'">
  <h1 * >It me ¯\_(ツ)_/¯</h1> <!-- This content will be displayed if logger is current user -->
  <button * class="btn">Who are you?</button> <!-- This content will be displayed if not -->
</ng-template>
```

Display content in case current user is not logged in
```html
<ng-template [isCurrentUser]="'vix'">
  <ng-template></ng-template> <!-- Trick: Define empty content for the right condition -->
  <button * class="btn">Who are you?</button>
</ng-template>
```

##### userRole
Check & display based on user role (the same concepts with ngSwitchCase)
```html
<ng-template userRole>
  <ng-template [userRoleIs]="'admin'">
    <button class="btn">Remove</button>
  </ng-template>
</ng-template>
```
```html
<ng-template userRole>
  <button *userRoleIs="'admin'" class="btn">Remove</button>
</ng-template>
```

#### Services
Inject NgAuthenticationService into AppComponent (in case you want to use some method of this service)
```
export class AppComponent {

  constructor(
    @Inject(NgAuthenticationService) private auth: NgAuthenticationService
  ) {}

}
```
