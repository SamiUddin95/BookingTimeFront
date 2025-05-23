import { Route } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { GridComponent } from './grid/grid.component'
import { DetailComponent } from './detail/detail.component'
import { BookingComponent } from './booking/booking.component'
import { ListComponent } from './list/list.component'
import { AddAttractionComponent } from './add-attraction/add-attraction.component'
import { AddAttractionSuccessComponent } from './add-attraction/components/success/success.component'

export const TOURS_ROUTES: Route[] = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Tour - Home' }
  },
  {
    path: 'grid',
    component: GridComponent,
    data: { title: 'Tour - Grid' }
  },
  {
    path: 'list/:id',
    component: ListComponent,
    data: { title: 'Tour - List' }
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    data: { title: 'Tour - Detail' },
  },
  {
    path: 'booking',
    component: BookingComponent,
    data: { title: 'Tour - Booking' },
  },
  {
    path: 'add-attraction',
    data: { title: 'Attraction - Add' },
    children: [
      { path: '', component: AddAttractionComponent } , 
      { path: 'success', component: AddAttractionSuccessComponent }  
    ]
  }
]
