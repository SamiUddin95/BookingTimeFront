import { AppServiceService } from '@/app/services/app-service.service';
import { credits, currentYear } from '@/app/store';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
  UntypedFormGroup,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'auth-sign-in',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styles: `
    :host(auth-sign-in) {
      display: contents;
    }
  `,
})
export class SignInComponent {
  creditsBy = credits;
  currentYear = currentYear;
  signinForm!: UntypedFormGroup;
  submitted: boolean = false;
  passwordType: boolean = true;

  public fb = inject(UntypedFormBuilder);
  public store = inject(Store);
  public toastr = inject(ToastrService);

  constructor(private app:AppServiceService) {
    this.signinForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
    });
  }

  get form() {
    return this.signinForm.controls;
  }

  onLogin() {
    debugger
    if (this.signinForm.invalid) {
      this.submitted = false;
      return;
    }
    const formData = this.signinForm.value;
    console.log('Sending login form data:', formData);
    this.app.post('login', formData).subscribe(
      (res) => {
        console.log('Login success:', res);
        if (res.code === 200) {
          // Success handling here
        }
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
    this.submitted = true;
    if (this.signinForm.valid) {

    }
  }
  

  changeType() {
    this.passwordType = !this.passwordType;
  }
}
