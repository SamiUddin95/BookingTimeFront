import { Component, inject } from '@angular/core'
import { NavbarComponent } from '../navbar/navbar.component'
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'help-vertical-menu-button',
  standalone: true,
  imports: [NavbarComponent],
  template: `
    <button
      class="navbar-toggler ms-auto"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarCollapse"
      aria-controls="navbarCollapse"
      (click)="showMenu()"
      [attr.aria-expanded]="isMenuOpen"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-animation">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
  `,
})
export class HelpVerticalMenuButtonComponent {
  isMenuOpen: boolean = false

  showMenu() {
    this.isMenuOpen = !this.isMenuOpen
    document.getElementById('navbarCollapse')?.classList.toggle('show')
  }
}
