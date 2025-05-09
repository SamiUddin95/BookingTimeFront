import { Component, inject, OnInit, type TemplateRef } from '@angular/core'
import { TopbarComponent } from './components/topbar/topbar.component'
import { AvailabilityFilterComponent } from './components/availability-filter/availability-filter.component'
import { HotelGalleryComponent } from './components/hotel-gallery/hotel-gallery.component'
import { RoomComponent } from './components/room/room.component'
import { CustomerReviewComponent } from './components/customer-review/customer-review.component'
import { PoliciesComponent } from './components/policies/policies.component'
import { AboutComponent } from './components/about/about.component'
import { AmenitiesComponent } from './components/amenities/amenities.component'
import { PriceOverviewComponent } from './components/price-overview/price-overview.component'
import { NgbOffcanvas, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap'
//import { Footer1Component } from './components/footer1/footer1.component'
import { TopNavHeaderComponent } from '@/app/components/top-nav-header/top-nav-header.component'
import { Footer1Component } from '../home/components/footer1/footer1.component'
import { StaysService } from '@/app/core/services/api/stays.service'
import { ActivatedRoute } from '@angular/router';
import { PropertyDetailsModelResponseModel } from '@/app/core/models/property-detail-model.model' 

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    TopbarComponent,
    AvailabilityFilterComponent,
    HotelGalleryComponent,
    RoomComponent,
    CustomerReviewComponent,
    PoliciesComponent,
    AboutComponent,
    AmenitiesComponent,
    PriceOverviewComponent,
    NgbOffcanvasModule,
    Footer1Component,
    TopNavHeaderComponent,
  ],
  templateUrl: './detail.component.html',
  styles: `
    :host(app-detail) {
      display: contents !important;
    }
  `,
})
export class DetailComponent implements OnInit {
  private offcanvasService = inject(NgbOffcanvas)
  private staysService = inject(StaysService)

  constructor(private route: ActivatedRoute) {}

  property: PropertyDetailsModelResponseModel = {
    rooms: []
  };

  openSearchFilter(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'top' })
  }

  ngOnInit(): void {
      this.getPropertyDetailsById();
  }

  getPropertyDetailsById(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : 0;
  
    if (!id || isNaN(id)) {
      console.error('Invalid property ID');
      return;
    }
  
    this.staysService.GetListingPropertyDetailById(id).subscribe({
      next: (res) => {
        this.property = res;
        console.log('Property Details:', res);
      },
      error: (err) => {
        console.error('Failed to fetch property details:', err);
      }
    });
  }
  
}
