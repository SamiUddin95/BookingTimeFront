import { PropertyDetailsModelResponseModel } from '@/app/core/models/property-detail-model.model';
import { Component, Input } from '@angular/core'
import { NgbCollapseModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'detail-about',
  standalone: true,
  imports: [NgbTooltipModule, NgbCollapseModule],
  templateUrl: './about.component.html',
  styles: `
    :host(detail-about) {
      display: contents !important;
    }
  `,
})
export class AboutComponent {
  isCollapsed = true

  @Input() data: PropertyDetailsModelResponseModel = {
    rooms: []
  };

}
