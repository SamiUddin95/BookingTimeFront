import { DateFormInputDirective } from '@/app/components/form/date-form-input.directive'
import { SelectFormInputDirective } from '@/app/components/form/select-form-input.directive'
import { AttractionService } from '@/app/core/services/api/attraction.service'
import { currency } from '@/app/store'
import { Component, inject, Inject, OnInit } from '@angular/core'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { RouterLink, Router } from '@angular/router'

import { FormsModule } from '@angular/forms'

interface Alert {
  name: string
}

@Component({
  selector: 'tours-hero',
  standalone: true,
  imports: [SelectFormInputDirective, DateFormInputDirective, NgbAlertModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent implements OnInit {
  constructor(private router: Router) {}

  currencyType = currency
  alertData: string[] = [
    'Taman Sari',
    'The Grand Palace',
    'Glacier National Park',
    'Machu Picchu',
    'Prambanan Temple',
    'Batu Gong',
    'Barobadur Temple',
    'Great Barrier Reef',
    'Argentine Patagonia',
  ]

  close(index: number) {
    this.alertData.splice(index, 1)
  }

  locations: any
  selectedCityId: any = 0

  private attractionService = inject(AttractionService)

  ngOnInit(): void {
    this.loadDestinations();
  }

  loadDestinations() {
    this.attractionService.GetAllDestinationsByAttraction().subscribe((res => {
      this.locations = res;
      console.log(res);
    }))
  }

  goToList(cityId: number) {
    if (cityId) {
      this.router.navigate(['/tours/list', cityId]).then(() => {
        location.reload();
      });
    }
  }
}
