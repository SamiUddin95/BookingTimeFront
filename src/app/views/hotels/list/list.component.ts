import { Component, inject, OnInit } from '@angular/core'
import { TopbarComponent } from './components/topbar/topbar.component'
import { BannerComponent } from './components/banner/banner.component'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'
import { ListcardComponent } from './components/listcard/listcard.component'
import { FilterOffcanvasComponent } from './components/filter-offcanvas/filter-offcanvas.component'
import { FilterbarComponent } from './components/filterbar/filterbar.component'
//import { Footer1Component } from './components/footer1/footer1.component'
import { RouterModule } from '@angular/router'

import { TopNavHeaderComponent } from '../../../components/top-nav-header/top-nav-header.component'
import { AvailabilityFilterComponent } from '../home/components/availability-filter/availability-filter.component'
import { Footer1Component } from '../home/components/footer1/footer1.component'

import { StaysService } from '@/app/core/services/api/stays.service'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    TopbarComponent,
    BannerComponent,
    NgbAlertModule,
    ListcardComponent,
    FilterbarComponent,
    FilterOffcanvasComponent,
    Footer1Component,
    RouterModule,
    TopNavHeaderComponent,
    AvailabilityFilterComponent
  ],
  templateUrl: './list.component.html',
  styles: ``,
})
export class ListComponent implements OnInit {
  staticAlertClosed = true;

  hotelFilter = {
    details: {
    },
    paginationInfo: {
    }
  };

  private staysService = inject(StaysService);

  searchHotel(e: Event) {
    console.log(e)
    // this.staysService.GetListingPropertyList(e).subscribe((res=> {
    //   this.hotelList = res;
    //   console.log(res)
    // }))
  }

  ngOnInit(): void {
      this.loadHotels();
  }

  // hotelList: any = {};

  loadHotels() {
    // this.staysService.GetListingPropertyList(this.hotelFilter).subscribe((res)=> {
    //   this.hotelList = res;
    //   console.log(res)
    // })
  }
}
