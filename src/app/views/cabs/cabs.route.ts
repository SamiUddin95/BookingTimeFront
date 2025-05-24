import { Route } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { ListComponent } from './list/list.component'
import { DetailComponent } from './detail/detail.component'
import { BookingComponent } from './booking/booking.component'
import { CarRegistrationComponent } from './car-registration/car-registration.component'
import { CarRegistrationSuccessComponent } from './car-registration/components/success/success.component'

export const CABS_ROUTES: Route[] = [
  { path: 'home', component: HomeComponent, data: { title: 'Cab - Home' } },
  /* { path: 'list', component: ListComponent, data: { title: 'Cab - List' } }, */
  {
    path: 'deal/:id',
    component: DetailComponent,
    data: { title: 'Car - Detail' },
  },
  {
    path: 'booking',
    component: BookingComponent,
    data: { title: 'Car - Booking' },
  },
  {
    path: 'register-car',
    data: { title: 'Car - Register' },
    children: [
      { path: '', component: CarRegistrationComponent },  // Default component for `/register-car`
      { path: 'success', component: CarRegistrationSuccessComponent }  // Handles `/register-car/success`
    ]
  }
  ,
  // {
  //   path: 'register-car/success',
  //   component: CarRegistrationSuccessComponent,
  //   data: {title: 'Register - Success'}
  // },
]
