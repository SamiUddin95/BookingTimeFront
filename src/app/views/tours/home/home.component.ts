import { Component } from '@angular/core'
import { TopbarComponent } from './components/top-nav/top-nav.component'
import { HeroComponent } from './components/hero/hero.component'
import { TourPackageComponent } from './components/tour-package/tour-package.component'
import { ActionBoxComponent } from './components/action-box/action-box.component'
import { TopCategoryComponent } from './components/top-category/top-category.component'
import { TourStoriesComponent } from './components/tour-stories/tour-stories.component'
import { Footer4Component } from './components/footer4/footer4.component'
import { FooterComponent } from '@/app/layouts/user-layout/components/footer/footer.component'
import { Footer1Component } from '../../hotels/home/components/footer1/footer1.component'         

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TopbarComponent,
    HeroComponent,
    TourPackageComponent,
    ActionBoxComponent,
    TopCategoryComponent,
    TourStoriesComponent,
    Footer4Component,
    Footer1Component
  ],
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent {}
