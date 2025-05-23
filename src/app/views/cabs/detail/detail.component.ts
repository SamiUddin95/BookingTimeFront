import { Component, inject, OnInit } from '@angular/core'
import { TopbarComponent } from './components/topbar/topbar.component'
import { BannerComponent } from './components/banner/banner.component'
import { CabDetailComponent } from './components/cab-detail/cab-detail.component'
import { Footer1Component } from './components/footer1/footer1.component'
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'
import { TripDetailComponent } from "./components/trip-detail/trip-detail.component";
import { CabDriverComponent } from "./components/cab-driver/cab-driver.component";
import { InclusionComponent } from "./components/inclusion/inclusion.component";
import { SafetyComponent } from "./components/safety/safety.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    TopbarComponent,
    BannerComponent,
    CabDetailComponent,
    Footer1Component,
    CommonModule,
    TripDetailComponent,
    CabDriverComponent,
    InclusionComponent,
    SafetyComponent,
    SidebarComponent
],
  templateUrl: './detail.component.html',
  styles: ``,
})
export class DetailComponent implements OnInit {

  deal: any;

  ngOnInit(): void {
    this.deal = history.state;
    console.log("Navigated deal: ", this.deal);
  }

  goBack() {
    history.back();
  }
}

