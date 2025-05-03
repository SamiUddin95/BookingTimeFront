import { Route } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { GridComponent } from './grid/grid.component'
import { DetailComponent } from './detail/detail.component'
import { BookingComponent } from './booking/booking.component'
import { ListComponent } from './list/list.component'

export const TOURS_ROUTES: Route[] = [
  { path: 'home', component: HomeComponent, data: { title: 'Tour - Home' } },
  { path: 'grid', component: GridComponent, data: { title: 'Tour - Grid' } },
  { path: 'list/:id', component: ListComponent, data: { title: 'Tour - List' } },
  {
    path: 'detail',
    component: DetailComponent,
    data: { title: 'Tour - Detail' },
  },
  {
    path: 'booking',
    component: BookingComponent,
    data: { title: 'Tour - Booking' },
  },
]
