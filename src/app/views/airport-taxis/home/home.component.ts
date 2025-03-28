import { Component } from '@angular/core';
import { Footer1Component } from '../../hotels/home/components/footer1/footer1.component'
import { TopNavHeaderComponent } from "../../../components/top-nav-header/top-nav-header.component";
import { BannerComponent } from './components/banner/banner.component';
import { TopbarComponent } from './components/topbar/topbar.component';

@Component({
  selector: 'airport-taxi-home',
  standalone: true,
  imports: [Footer1Component, TopNavHeaderComponent, BannerComponent, TopbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
