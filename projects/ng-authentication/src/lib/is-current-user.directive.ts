import {
  Directive,
  OnInit,
  OnDestroy,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NgAuthenticationService } from './ng-authentication.service';
import { IsAuthenticatedDirective } from './is-authenticated.directive';

@Directive({
  selector: '[isCurrentUser]'
})
export class IsCurrentUserDirective implements OnInit, OnDestroy {

  @Input() isCurrentUser: string;
  isAuthentication: boolean;
  ifTpl: TemplateRef<any>;
  elseTpl: TemplateRef<any>;
  user$: Subscription;

  constructor(
    private tpl: TemplateRef<any>,
    private auth: NgAuthenticationService,
    private viewContainer: ViewContainerRef
  ) {
  }

  ngOnInit() {
    this.viewContainer.createEmbeddedView(this.tpl);
    const nodes = this.viewContainer['_embeddedViews'][0]['nodes'];
    this.ifTpl = nodes[0] ? nodes[0]['template'] : null;
    this.elseTpl = nodes[1] ? nodes[1]['template'] : null;
    this._createView();
    this.user$ = this.auth.logger.subscribe(() => {
      this._createView();
    });
  }

  ngOnDestroy() {
    if (this.user$) {
      this.user$.unsubscribe();
    }
  }

  private _createView() {
    this.viewContainer.clear();
    if (this.auth.isCurrentUser(this.isCurrentUser)) {
      if (this.ifTpl) {
        this.viewContainer.createEmbeddedView(this.ifTpl);
      } else if (!this.ifTpl && !this.elseTpl) {
        this.viewContainer.createEmbeddedView(this.tpl);
      }
    } else {
      if (this.elseTpl) {
        this.viewContainer.createEmbeddedView(this.elseTpl);
      }
    }
  }

}
