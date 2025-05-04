import { Component, inject, OnInit } from '@angular/core'
import { tourPackages } from '../../data'
import { RouterLink } from '@angular/router'
import { currency } from '@/app/store'
import { AttractionService } from '@/app/core/services/api/attraction.service'

@Component({
  selector: 'tours-tour-package',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tour-package.component.html',
  styleUrl: './tour-package.component.scss',
})
export class TourPackageComponent implements OnInit {
  //tourPackages = tourPackages
  currencyType = currency

  tourPackages: any

  private attractionService = inject(AttractionService);

  ngOnInit(): void {
    this.loadTopDestinations();
  }

  loadTopDestinations() {
    this.attractionService.GetTopDestinationsByAttraction().subscribe((res => {
      this.tourPackages = res
      console.log(res)
    }))
  }


}
