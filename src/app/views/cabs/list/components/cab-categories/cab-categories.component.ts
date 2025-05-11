import { CarRentalsService } from '@/app/core/services/api/car-rentals.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cab-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cab-categories.component.html',
  styleUrl: './cab-categories.component.scss'
})
export class CabCategoriesComponent implements OnInit {

  private carService = inject(CarRentalsService)
  categories: any;

  ngOnInit(): void {
    this.carService.GetAllCarCategories().subscribe((res=> {
      this.categories = res;
    }))
  }
}
