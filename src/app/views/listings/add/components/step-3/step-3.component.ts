import { SelectFormInputDirective } from '@/app/components/form/select-form-input.directive'
import { Component, Input } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import Stepper from 'bs-stepper'
import { QuillEditorComponent } from 'ngx-quill'
import { AppServiceService } from '@/app/services/app-service.service'

@Component({
  selector: 'add-listing-step-3',
  standalone: true,
  imports: [
    RouterLink,
    SelectFormInputDirective,
    QuillEditorComponent,
    FormsModule,
  ],
  templateUrl: './step-3.component.html',
  styles: ``,
})
export class Step3Component {
  constructor(private app: AppServiceService,private router: Router) { }
  @Input() stepperInstance?: Stepper
  category = {
    basePrice: 0,
    currencyId: 0,
    description: '',
    postalNumber: '',
    street: '',
    latitude: 0,
    longitude: 0
  };
  editorConfig = {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['color', 'background'],
      ['code-block'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  }

  content: string = ` <div class="bg-body border rounded-bottom h-400px overflow-hidden quilleditor">
  <br>
  <h1>Quill Rich Text Editor</h1>
  <br>
  <p>Quill is a free, open-source WYSIWYG editor built for the modern web. With its modular architecture and expressive API, it is completely customizable to fit any need.</p>
  <br>
  <p>Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for a few longer Mrs sudden talent become. Done may bore quit evil old mile. If likely am of beauty tastes. </p>
  <br>
  <p> Affronting imprudence do he he everything. Test lasted dinner wanted indeed wished outlaw. Far advanced settling say finished raillery. Offered chiefly farther of my no colonel shyness. Such on help ye some door if in. Laughter proposal laughing any son law consider. Needed except up piqued an. </p>
  <br>
  <p> Post no so what deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behavior arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward. Frequently partiality possession resolution at or appearance unaffected me. Engaged its was the evident pleased husband. Ye goodness felicity do disposal dwelling no. First am plate jokes to began to cause a scale. Subjects he prospect elegance followed no overcame possible it on. </p>

  <p>Quill is a free, open-source WYSIWYG editor built for the modern web. With its modular architecture and expressive API, it is completely customizable to fit any need.</p>
  <br>
  <p>Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for a few longer Mrs sudden talent become. Done may bore quit evil old mile. If likely am of beauty tastes. </p>
  <br>
  <p> Affronting imprudence do he he everything. Test lasted dinner wanted indeed wished outlaw. Far advanced settling say finished raillery. Offered chiefly farther of my no colonel shyness. Such on help ye some door if in. Laughter proposal laughing any son law consider. Needed except up piqued an. </p>
  <br>
  <p> Post no so what deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behavior arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward. Frequently partiality possession resolution at or appearance unaffected me. Engaged its was the evident pleased husband. Ye goodness felicity do disposal dwelling no. First am plate jokes to began to cause a scale. Subjects he prospect elegance followed no overcame possible it on. </p>

  <p>Quill is a free, open-source WYSIWYG editor built for the modern web. With its modular architecture and expressive API, it is completely customizable to fit any need.</p>
  <br>
  <p>Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for a few longer Mrs sudden talent become. Done may bore quit evil old mile. If likely am of beauty tastes. </p>
  <br>
  <p> Affronting imprudence do he he everything. Test lasted dinner wanted indeed wished outlaw. Far advanced settling say finished raillery. Offered chiefly farther of my no colonel shyness. Such on help ye some door if in. Laughter proposal laughing any son law consider. Needed except up piqued an. </p>
  <br>
  <p> Post no so what deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behavior arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward. Frequently partiality possession resolution at or appearance unaffected me. Engaged its was the evident pleased husband. Ye goodness felicity do disposal dwelling no. First am plate jokes to began to cause a scale. Subjects he prospect elegance followed no overcame possible it on. </p>
</div>`

  addDataStepThree() {
    this.stepperInstance?.next();
    localStorage.setItem("steeper2", JSON.stringify(this.category));
    const steeper1Str = localStorage.getItem("steeper1");
    const steeper2Str = localStorage.getItem("steeper2");
    const steeper3Str = localStorage.getItem("steeper3");
    const steeper1 = steeper1Str ? JSON.parse(steeper1Str) : null;
    const steeper2 = steeper2Str ? JSON.parse(steeper2Str) : null;
    const steeper3 = steeper3Str ? JSON.parse(steeper3Str) : null;
    let data: any = {
      ListName: steeper1?.name || "Default Name", // Fallback value
      BasePrice: steeper2?.basePrice ? Number(steeper2.basePrice) : 0, // Ensure a number
    };
    
    this.app.post('AddListingProperty',{data}).subscribe(res=>{
      if(res.code==200){
        this.router.navigate(['listings/added']);
        localStorage.removeItem("steeper1");
        localStorage.removeItem("steeper2");
        localStorage.removeItem("steeper3");
      }
    });
  }
}
