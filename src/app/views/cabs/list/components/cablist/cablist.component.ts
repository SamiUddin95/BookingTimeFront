import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnInit,
  Renderer2,
  type TemplateRef,
} from '@angular/core'
import { CablistfilterComponent } from '../cablistfilter/cablistfilter.component'
import { CabalertComponent } from '../cabalert/cabalert.component'
import { cabsLists } from '../../data'
import {
  NgbOffcanvas,
  NgbOffcanvasModule,
  NgbPaginationModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'
import { StickyDirective } from '@/app/directives/sticky.directive'
import { currency } from '@/app/store'
import { CabCategoriesComponent } from "../cab-categories/cab-categories.component";
import { CommonModule } from '@angular/common'
import { CarRentalsService } from '@/app/core/services/api/car-rentals.service'

@Component({
  selector: 'cab-list',
  standalone: true,
  imports: [
    CablistfilterComponent,
    CabalertComponent,
    NgbPaginationModule,
    NgbRatingModule,
    NgbOffcanvasModule,
    RouterModule,
    StickyDirective,
    CabCategoriesComponent,
    CommonModule
  ],
  templateUrl: './cablist.component.html',
  styles: `
    :host(cab-list) {
      display: contents !important;
    }
  `,
})
export class CablistComponent implements OnInit {

  @Input() carList: any = [];
  filteredList: any = [];
  
  @Input() allCategories: any[] = []
  selectedCategoryId: any

  private carService = inject(CarRentalsService)

  public renderer = inject(Renderer2)
  public eleRef = inject(ElementRef)
  private offcanvasService = inject(NgbOffcanvas)

  ngOnInit() {
    this.filteredList = this.carList
  }

  openFilter(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' })
  }

  selectCategory(categoryId: number) {
    this.selectedCategoryId = categoryId;
    this.filteredList = this.carList.filter((car: { categoryId: number }) => car.categoryId === categoryId);
  }
}
