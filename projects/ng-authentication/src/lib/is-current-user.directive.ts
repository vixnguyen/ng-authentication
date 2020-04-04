import { Directive, Input, OnInit, TemplateRef, ViewContainerRef, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgAuthenticationService } from './ng-authentication.service';

@Directive({
  selector: '[isCurrentUser]'
})


export class IsCurrentUserDirective implements OnInit, OnChanges, OnDestroy {

  @Input() isCurrentUser: string;
  isAuthentication: boolean;
  ifTpl: TemplateRef<any>;
  elseTpl: TemplateRef<any>;
  subscription = new Subscription();

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
    this._reRenderer();
    this.subscription.add(
      this.auth.logger.subscribe(() => {
        this._reRenderer();
      })
    );
  }

  ngOnChanges() {
    this._reRenderer();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private _reRenderer() {
    this.viewContainer.clear();
    if (this.auth.isAuthenticated()) {
      if (this.auth.isCurrentUser(this.isCurrentUser)) {
        if (this.ifTpl) {
          this.viewContainer.createEmbeddedView(this.ifTpl);
        }
      } else {
        if (this.elseTpl) {
          this.viewContainer.createEmbeddedView(this.elseTpl);
        }
      }
    }
  }

}
