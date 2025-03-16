import { Component } from '@angular/core';
import { Footer1Component } from '../../hotels/home/components/footer1/footer1.component';
import { TopbarComponent } from './components/topbar/topbar.component'; 
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-registration',
  standalone: true,
  imports: [Footer1Component, TopbarComponent, CommonModule],
  templateUrl: './car-registration.component.html',
  styleUrl: './car-registration.component.scss'
})
export class CarRegistrationComponent {
  form!: FormGroup;
  currentStep = 1;
  totalSteps = 7;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      carModel: ['', Validators.required],
      carMake: ['', Validators.required],
      year: ['', Validators.required],
      color: ['', Validators.required],
      engineType: ['', Validators.required],
      mileage: ['', Validators.required],
      vin: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      insurance: ['', Validators.required],
      ownerName: ['', Validators.required],
      confirmation: [false, Validators.requiredTrue]
    });
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      alert('Car Registered Successfully!');
    }
  }

  formValid() {

  }
}
