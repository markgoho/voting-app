import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-auth-form',
  styleUrls: ['auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="auth-form">
      <ng-content select="h1"></ng-content>
      <button (click)="loginWith('google')" type="button">Google</button>
      <button (click)="loginWith('facebook')" type="button">Facebook</button>
      <button (click)="loginWith('twitter')" type="button">Twitter</button>
    </div>
  `
})
export class AuthFormComponent {
  @Output() login = new EventEmitter<string>();
  constructor() {}

  loginWith(service: string): void {
    this.login.emit(service);
  }
}
