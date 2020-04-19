import {
  Directive,
  Host,
  OnInit,
  OnDestroy,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NgAuthenticationService } from './ng-authentication.service';

@Directive({
  selector: '[userRole]'
})
export class UserRoleDirective implements OnInit, OnDestroy {

  user$: Subscription;

  constructor(
    private tpl: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: NgAuthenticationService
  ) {}
  
  ngOnInit() {
    this.viewContainer.createEmbeddedView(this.tpl);
    this.user$ = this.auth.logger.subscribe(() => {
      this._initTpl();
    });
  }

  ngOnDestroy() {
    if (this.user$) {
      this.user$.unsubscribe();
    }
  }

  addTpl(value: any, tpl: TemplateRef<any>) {
    if (this.auth.isAuthenticated() === value) {
      this.viewContainer.createEmbeddedView(tpl);
    }
  }

  private _initTpl() {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.tpl);
  }

}

@Directive({
  selector: '[userRoleIs]',
  providers: [UserRoleDirective]
})
export class UserRoleIsDirective implements OnInit  {

  @Input() userRoleIs: boolean | string;

  constructor(
    @Host() private wrapper: UserRoleDirective,
    viewContainer: ViewContainerRef,
    private tpl: TemplateRef<any>
  ) {}

  ngOnInit() {
    this.wrapper.addTpl(this.userRoleIs, this.tpl);
  }

}
