import { Route } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { RegisterTaxiComponent } from './register-taxi/register-taxi.component'

export const AIRPORT_TAXI_ROUTES: Route[] = [
   { path: 'home', component: HomeComponent, data: { title: 'Airport Taxi - Home' } },
   { path: 'register-taxi', component: RegisterTaxiComponent, data: { title: 'Airport Taxi - Register' } },
//   {
//     path: 'detail',
//     component: DetailComponent,
//     data: { title: 'Car - Detail' },
//   },
//   {
//     path: 'booking',
//     component: BookingComponent,
//     data: { title: 'Car - Booking' },
//   },
//   {
//     path: 'register-car',
//     data: { title: 'Car - Register' },
//     children: [
//       { path: '', component: CarRegistrationComponent },  // Default component for `/register-car`
//       { path: 'success', component: CarRegistrationSuccessComponent }  // Handles `/register-car/success`
//     ]
//   }
  
]
