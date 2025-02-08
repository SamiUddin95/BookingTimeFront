import { Component, Input } from '@angular/core';
import { VerticalMenuButtonComponent } from '@/app/components/app-menu/components/vertical-menu-button.component'
import { StickyHeaderComponent } from '@/app/components/sticky-header.component'
import { NotificationDropdownComponent } from '@/app/components/top-bar/notification-dropdown/notification-dropdown.component'
import { ProfileDropdownComponent } from '@/app/components/top-bar/profile-dropdown/profile-dropdown.component'
import { RouterLink } from '@angular/router'
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap'
import { AppMenuComponent } from 'src/app/components/app-menu/app-menu.component'
import { LogoBoxComponent } from 'src/app/components/logo-box/logo-box.component'
import { bookingHomeMenuItems } from 'src/assets/data'

@Component({
  selector: 'top-nav-header',
  standalone: true,
  imports: [
    StickyHeaderComponent,
    AppMenuComponent,
    NgbDropdownModule,
    LogoBoxComponent,
    RouterLink,
    NgbCollapseModule,
    VerticalMenuButtonComponent,
    NotificationDropdownComponent,
    ProfileDropdownComponent,
  ],
  templateUrl: './top-nav-header.component.html',
  styleUrl: './top-nav-header.component.scss'
})
export class TopNavHeaderComponent {
  bookingHomeMenuItems = bookingHomeMenuItems
  isCollapsed = true
  @Input() activeTab: string = "";

}
