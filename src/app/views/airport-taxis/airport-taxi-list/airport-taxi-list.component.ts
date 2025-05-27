import { AirportTaxiDetailsRequestModel, TaxiResponseModel } from '@/app/core/models/requestModels/register-airport-taxi.model';
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

  taxis: TaxiResponseModel[] = [];
  currentPage = 1;
  totalCount = 0;
  pageSize = 10;

  // ngOnInit(): void {
  //   this.filterService.requestModel$.subscribe(model => {
  //     if (model) {
  //       this.currentPage = model.paginationInfo.page ?? 1;
  //       this.pageSize = model.paginationInfo.pageSize ?? 10;
  //       this.loadTaxis(model);
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.filterService.cityName$.subscribe((cityName:any) => {
      if (cityName) {
        this.loadTaxis(cityName);
      }
    });
  }
  

  // getVehicleTypeNames(taxi: TaxiDetails): string {
  //   return taxi.vehicleTypes.map(v => v.name).join(', ');
  // }

  loadTaxis(requestModel: any): void {
    this.taxiService.GetAirportTaxisList(requestModel).subscribe(response => {
      this.taxis = response;
      // this.totalCount = response.totalCount;
    });
  }


  getTaxiImageById(taxiId: number): string {
    const imageMap: { [key: number]: string } = {
      1: 'assets/images/Cars/standard.jpg',
      2: 'assets/images/Cars/exe-sedan.jpg',
      4: 'assets/images/Cars/lux-sedan.jpg',
      5: 'assets/images/Cars/people-carrier.jpg',
      6: 'assets/images/Cars/people-carrier.jpg',
      7: 'assets/images/Cars/exe-people.jpg',
      8: 'assets/images/Cars/minibus.jpg',
    };
  
    return imageMap[taxiId] || 'assets/images/Cars/standard.jpg'; 
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
    (event.target as HTMLImageElement).src = 'assets/images/Cars/standard.jpg';
  }
  

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}