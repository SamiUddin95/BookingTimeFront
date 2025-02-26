import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { QuillEditorComponent } from 'ngx-quill';
import { AppServiceService } from '@/app/services/app-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'add-listing-step-3',
  standalone: true,
  imports: [CommonModule, QuillEditorComponent, FormsModule],
  templateUrl: './step-3.component.html',
  styles: ``,
})
export class Step3Component {
  constructor(private app: AppServiceService, private router: Router) {}

  @Input() stepperInstance?: Stepper;

  category = {
    basePrice: null,
    discount: null,
    currencyId: 0,
    ratingId: '',
    description: '',
  };

  currencies = [
    { id: 0, name: 'Select Currency' },
    { id: 1, name: 'USD' },
    { id: 2, name: 'EURO' },
    { id: 3, name: 'VND' },
  ];

  rating = [
    { id: '★★★★★', name: '★★★★★' },
    { id: '★★★★☆', name: '★★★★☆' },
    { id: '★★★☆☆', name: '★★★☆☆' },
    { id: '★★☆☆☆', name: '★★☆☆☆' },
    { id: '★☆☆☆☆', name: '★☆☆☆☆' },
  ];

  editorConfig = {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['color', 'background'],
      ['code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  isFormValid: boolean = false;

  validateForm() {
    this.isFormValid =
      this.category.currencyId !== 0 &&
      this.category.basePrice !== null &&
      this.category.basePrice > 0 &&
      this.category.discount !== null &&
      this.category.discount >= 0 &&
      this.category.ratingId.trim() !== ''
  }

  addDataStepThree() {
    if (!this.isFormValid) return;

    this.stepperInstance?.next();
    localStorage.setItem('steeper2', JSON.stringify(this.category));

    const steeper1Str = localStorage.getItem('steeper1');
    const steeper2Str = localStorage.getItem('steeper2');
    const steeper1 = steeper1Str ? JSON.parse(steeper1Str) : null;
    const steeper2 = steeper2Str ? JSON.parse(steeper2Str) : null;

    let data: any = {
      ListName: steeper1?.name || 'Default Name',
      BasePrice: steeper2?.basePrice ? Number(steeper2.basePrice) : 0,
    };

    this.app.post('AddListingProperty', { data }).subscribe((res) => {
      if (res.code == 200) {
        this.router.navigate(['listings/added']);
        localStorage.removeItem('steeper1');
        localStorage.removeItem('steeper2');
        localStorage.removeItem('steeper3');
      }
    });
  }
}
