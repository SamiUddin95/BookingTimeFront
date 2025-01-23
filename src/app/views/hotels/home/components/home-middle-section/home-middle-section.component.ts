import { Component } from '@angular/core';
import { vacationPackageData, featuredPropertiesData } from '../../data'
import { currency } from '@/app/store'
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home-middle-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-middle-section.component.html',
  styleUrl: './home-middle-section.component.scss',
  providers: [DatePipe]
})
export class HomeMiddleSectionComponent {

  packages = vacationPackageData
  currencyType = currency
}
