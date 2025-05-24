import { AirportTaxiDetailsRequestModel, TaxiDetails } from '@/app/core/models/requestModels/register-airport-taxi.model';
import { AirportTaxiFilterService } from '@/app/core/services/airport-taxi-filter.service';
import { AirportTaxisService } from '@/app/core/services/api/airport-taxi.service';
import { CommonService } from '@/app/core/services/api/common.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-airport-taxi-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './airport-taxi-list.component.html',
  styleUrl: './airport-taxi-list.component.scss'
})
export class AirportTaxiListComponent  implements OnInit {

  private taxiService = inject(AirportTaxisService)
  private filterService = inject(AirportTaxiFilterService);

  taxis: TaxiDetails[] = [];
  currentPage = 1;
  totalCount = 0;
  pageSize = 10;

  ngOnInit(): void {
    this.filterService.requestModel$.subscribe(model => {
      if (model) {
        this.currentPage = model.paginationInfo.page ?? 1;
        this.pageSize = model.paginationInfo.pageSize ?? 10;
        this.loadTaxis(model);
      }
    });
  }

  getVehicleTypeNames(taxi: TaxiDetails): string {
    return taxi.vehicleTypes.map(v => v.name).join(', ');
  }

  loadTaxis(requestModel: AirportTaxiDetailsRequestModel): void {
    this.taxiService.GetAirportTaxiList(requestModel).subscribe(response => {
      this.taxis = response.taxidetails;
      this.totalCount = response.totalCount;
    });
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.filterService.requestModel$.subscribe(model => {
      if (model) {
        const updatedModel = {
          ...model,
          paginationInfo: {
            ...model.paginationInfo,
            page: this.currentPage
          }
        };
        this.filterService.updateFilter(updatedModel);
      }
    });
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/Cars/car.jpg';
  }
  

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}