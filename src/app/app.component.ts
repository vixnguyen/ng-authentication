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
        avatar: 'https://scontent-sin6-1.xx.fbcdn.net/v/t31.0-1/cp0/p50x50/11888514_936655183067191_3140575884179561539_o.jpg?_nc_cat=100&_nc_sid=dbb9e7&_nc_ohc=2mYieZY_5FsAX_EUtZ2&_nc_ht=scontent-sin6-1.xx&oh=97c7efd9b7f845b1e44608669cf3b66b&oe=5EA66978',
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
    this.auth.signInWithLink({uid}).then(() => {
      this.loggedInAs = uid;
    });
  }
  
  onLogout() {
    this.auth.signout();
    this.loggedInAs = '';
  }

  onVote(item: any) {
    item.voted[this.loggedInAs] = true;
  }

}
