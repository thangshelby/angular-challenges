import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-manager',
  imports: [CommonModule, ButtonComponent, RouterLink],
  template: `
    <p>manager works!</p>
    <button app-button routerLink="/">Logout</button>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerComponent {}
