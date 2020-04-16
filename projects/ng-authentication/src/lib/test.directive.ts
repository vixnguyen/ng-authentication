import {
  Directive,
  Input,
  Host,
  OnInit,
  AfterViewInit,
  TemplateRef,
  ViewContainerRef,
  OnChanges,
  OnDestroy,
  AfterViewChecked
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NgAuthenticationService } from './ng-authentication.service';

@Directive({
  selector: '[testAuthenticated]'
})
export class TestAuthenticatedDirective implements OnInit {

  user$: Subscription;


  constructor(
    private tpl: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: NgAuthenticationService
  ) {
  }
  
  ngOnInit() {
    this.viewContainer.createEmbeddedView(this.tpl);
    this.user$ = this.auth.logger.subscribe(() => {
      this._reRender();
    });
  }

  addTpl(value: any, tpl: TemplateRef<any>) {
    if (this.auth.isAuthenticated() === value) {
      this.viewContainer.createEmbeddedView(tpl);
    }
  }

  private _reRender() {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.tpl);
  }

}

@Directive({
  selector: '[caseExpected]',
  providers: [TestAuthenticatedDirective]
})
export class caseExpectedDirective implements OnInit  {

  @Input() caseExpected: boolean | string;

  constructor(
    @Host() private wrapper: TestAuthenticatedDirective,
    public viewContainer: ViewContainerRef,
    private tpl: TemplateRef<any>
  ) {
  }

  ngOnInit() {
    this.wrapper.addTpl(this.caseExpected, this.tpl);
  }

}
