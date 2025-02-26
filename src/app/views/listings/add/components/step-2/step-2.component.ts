import {
  SelectFormInputDirective,
  type SelectOptions,
} from '@/app/components/form/select-form-input.directive';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Stepper from 'bs-stepper';
import { QuillEditorComponent } from 'ngx-quill';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'add-listing-step-2',
  standalone: true,
  imports: [SelectFormInputDirective, QuillEditorComponent, FormsModule,CommonModule],
  templateUrl: './step-2.component.html',
})
export class Step2Component {
  @Input() stepperInstance?: Stepper;
  category = {
    selectedAmenities:'',
    content: '',
    guest: '',
    description: '',
    countryId: 0,
    stateId: 0,
    city: '',
    postalNumber: '',
    street: '',
    latitude: 0,
    longitude: 0
  };
  selectOptions: SelectOptions = {
    maxItemCount: 15,
    removeItems: true,
  };

  content: string = ` <div class="bg-body border rounded-bottom h-400px overflow-hidden quilleditor">
  ...`; // your editor content here

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
  };

  // List of amenities
  amenitiesList: string[] = [
    'Swimming pool',
    'Spa',
    'Kid\'s play area',
    'Gym',
    'Ironing Service',
    'Concierge',
    'Lift',
    'Dry cleaning',
    'Room Service',
    'Waiting Area',
    'Secrete smoking area',
  ];

  // Selected amenities (using ngModel)
  selectedAmenities: string[] = [];
  addDataStepTwo(){
    console.log("Done");
    this.stepperInstance?.next();
    localStorage.setItem("steeper2",JSON.stringify(this.category));
  }
}
