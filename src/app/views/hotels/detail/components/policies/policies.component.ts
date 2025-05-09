import { PropertyDetailsModelResponseModel } from '@/app/core/models/property-detail-model.model';
import { Component, Input } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'detail-policies',
  standalone: true,
  imports: [],
  templateUrl: './policies.component.html',
  styles: `
    :host(detail-policies) {
      display: contents !important;
    }
  `,
})

export class PoliciesComponent {


  policyDescSafeHtml: SafeHtml | null = null;
  
  constructor(private sanitizer: DomSanitizer) {}
  policies = [
    'Check-in: 1:00 pm - 9:00 pm',
    'Check out: 11:00 am',
    'Self-check-in with building staff',
    'No pets',
    'No parties or events',
    'Smoking is allowed',
  ]

  @Input() data: PropertyDetailsModelResponseModel = {
    rooms: []
  };

  ngOnChanges() {
    if (this.data?.policyDesc) {
      this.policyDescSafeHtml = this.sanitizer.bypassSecurityTrustHtml(this.data.policyDesc);
    }
  }
}
