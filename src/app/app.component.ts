import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { NgAuthenticationService } from 'ng-authentication';

@Component({
  selector: 'auth-sample-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {

  members: Array<object>;
  loggedInAs: string;

  constructor(
    @Inject(NgAuthenticationService) private auth: NgAuthenticationService
  ) {
    this.members = [
      {
        avatar: 'https://avatars1.githubusercontent.com/u/62738404?s=400&u=b21b9975f65e94493576f52c6ecdc79b3cc64825&v=4',
        name: 'Philippe Pham',
        email: 'phillipe.pham@gmail.com',
        posts: 7,
        voted: {}
      }, {
        avatar: 'https://miro.medium.com/fit/c/80/80/2*wVB02Yf-s4OTFmqfpOO9rg.jpeg',
        name: 'Vix Nguyen',
        email: 'vinguyen.fitsgu@gmail.com',
        posts: 5,
        voted: {}
      }, {
        avatar: 'https://ca.slack-edge.com/TP6KHUJE7-UTHET5V3Q-814e8e42c291-192',
        name: 'Ricky Nguyen',
        email: 'ricky.nguyen@gmail.com',
        posts: 12,
        voted: {}
      }
    ];
    const userInfo = this.auth.getUserInfo();
    this.loggedInAs = userInfo ? userInfo.uid : '';
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  onLogin(uid: string) {
    let body: any = {uid}
    if (uid === 'admin@gmail.com') {
      body.role = 'admin';
    }
    this.auth.signInWithLink(body).then(() => {
      this.loggedInAs = uid;
    });
  }
  
  onLogout() {
    this.auth.signOut();
    this.loggedInAs = '';
  }

  onVote(item: any) {
    item.voted[this.loggedInAs] = true;
  }

}
