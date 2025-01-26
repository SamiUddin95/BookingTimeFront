import { AppMenuComponent } from '@/app/components/app-menu/app-menu.component'
import { VerticalMenuButtonComponent } from '@/app/components/app-menu/components/vertical-menu-button.component'
import { LogoBoxComponent } from '@/app/components/logo-box/logo-box.component'
import { StickyHeaderComponent } from '@/app/components/sticky-header.component'
import { NotificationDropdownComponent } from '@/app/components/top-bar/notification-dropdown/notification-dropdown.component'
import { ProfileDropdownComponent } from '@/app/components/top-bar/profile-dropdown/profile-dropdown.component'
import { bookingHomeMenuItems } from '@/assets/data/menu-items'
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'add-listing-topbar',
  standalone: true,
  imports: [
    LogoBoxComponent,
    VerticalMenuButtonComponent,
    NgbDropdownModule,
    NgbCollapseModule,
    AppMenuComponent,
    ProfileDropdownComponent,
    NotificationDropdownComponent,
    StickyHeaderComponent,
    NgbDropdownModule,
    RouterLink,
  ],
  templateUrl: './topbar.component.html',
  styles: ``,
})
export class TopbarComponent {
  bookingHomeMenuItems = bookingHomeMenuItems
  isCollapsed = true
}
