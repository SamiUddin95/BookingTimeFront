import { BsStepperWrapperComponent } from '@/app/components/bs-stepper-wrapper.component'
import { Component } from '@angular/core'
import { Step1Component } from './components/step-1/step-1.component'
import { Step2Component } from './components/step-2/step-2.component'
import { Step3Component } from './components/step-3/step-3.component'
import { ListingStepperComponent } from '@views/listings/add/components/listing-stepper/listing-stepper.component'
import { TopbarComponent } from './components/topbar/topbar.component'
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'listings-add',
  standalone: true,
  imports: [
    BsStepperWrapperComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    ListingStepperComponent,
    TopbarComponent,
    FooterComponent,
  ],
  templateUrl: './add.component.html',
  styles: ``,
})
export class AddComponent {}
