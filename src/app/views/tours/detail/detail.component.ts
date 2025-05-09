import { Component, inject, OnInit } from '@angular/core'
import { TopbarComponent } from '../home/components/top-nav/top-nav.component'
import { HeroComponent } from './components/hero/hero.component'
import { DetailTabComponent } from './components/detail-tab/detail-tab.component'
import { Footer1Component } from './components/footer1/footer1.component'
import { AttractionService } from '@/app/core/services/api/attraction.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    TopbarComponent,
    HeroComponent,
    DetailTabComponent,
    Footer1Component,
  ],
  templateUrl: './detail.component.html',
  styles: ``,
})
export class DetailComponent implements OnInit {
  private attractionService = inject(AttractionService)
  attractionId: any;
  attraction: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.attractionId = this.route.snapshot.paramMap.get('id');
    this.loadAttractionDetails(this.attractionId);
  }

  loadAttractionDetails(id: number) {
    this.attractionService.GetAttractionsById(id).subscribe((res => {
      this.attraction = res;
      console.log(res);
    }))
  }
}


