import { Component } from '@angular/core'
import { featuredHotelsData } from '../../data'
import { currency } from '@/app/store'
import { RouterModule } from '@angular/router'
import { AppServiceService } from '@/app/services/app-service.service'

@Component({
  selector: 'home-feture-hotel',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './feture-hotel.component.html',
  styleUrl: `./feture-hotel.component.scss`,
})
export class FetureHotelComponent {
  constructor(private app: AppServiceService) { }
  // hotels = featuredHotelsData.slice(0, 4)
  currencyType = currency
  hotels: any = [];
  ngOnInit() {
    this.app.get("GetListOFProperty").subscribe(res => {
      this.hotels = res.map((e: any) => ({
        location: 'New York',
        image: 'assets/images/category/hotel/01.jpg',
        name: 'The New York Hotel',
        price: 455,
        ratings: 3.2,
        reviews: 128
      }));

      console.log(this.hotels);
    });
  }

}
