import {
  Component,
  inject,
  OnInit,
  Renderer2,
  type TemplateRef,
} from '@angular/core'
import { TopbarComponent } from '../home/components/topbar/topbar.component'
import { HeroComponent } from './components/hero/hero.component'
import { CablistComponent } from './components/cablist/cablist.component'
import { CablistfilterComponent } from './components/cablistfilter/cablistfilter.component'
import { Footer1Component } from './components/footer1/footer1.component'
import { cabsLists } from './data'
import {
  NgbAlertModule,
  NgbOffcanvas,
  NgbPaginationModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'
import { footerLinks, topLinks } from '@/assets/data/footer-items'
import { NgxSliderModule, type Options } from '@angular-slider/ngx-slider'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { BannerComponent } from "./components/banner/banner.component";
import { CarRentalsService } from '@/app/core/services/api/car-rentals.service'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    TopbarComponent,
    HeroComponent,
    CablistComponent,
    CablistfilterComponent,
    Footer1Component,
    NgbAlertModule,
    NgbPaginationModule,
    NgbRatingModule,
    NgxSliderModule,
    RouterModule,
    BannerComponent
  ],
  templateUrl: './list.component.html',
  styles: ``,
})
export class ListComponent implements OnInit {
  cabsLists = cabsLists
  topLinks = topLinks
  footerLinks = footerLinks

  value: number = 700
  highValue: number = 1500
  options: Options = {
    floor: 500,
    ceil: 2000,
  }

  private offcanvasService = inject(NgbOffcanvas)
  private route = inject(ActivatedRoute)
  private carService = inject(CarRentalsService)

  carFilter: any = {};
  carList: any = {};

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.carFilter = params;
      this.getFilteredCars();
    });
  }

  getFilteredCars() {
    this.carService.FilteredCarList(this.carFilter).subscribe((res) => {
      this.carList = res;
      console.log(this.carList)
    });
  }

  updateList(updatedList: any) {
    this.carList = updatedList
  }

  openFilter(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' })
  }
}
