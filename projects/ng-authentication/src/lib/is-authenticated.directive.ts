import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { NgAuthenticationService } from './ng-authentication.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[isAuthenticated]'
})


export class IsAuthenticatedDirective implements OnInit, OnChanges, OnDestroy {

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

  ngOnChanges() {
    this._createView();
  }

  ngOnDestroy() {
    if (this.user$) {
      this.user$.unsubscribe();
    }
  }

  private _createView() {
    this.viewContainer.clear();
    if (this.auth.isAuthenticated()) {
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
