import { AppServiceService } from '@/app/services/app-service.service'
import { credits, currentYear } from '@/app/store'
import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
  type AbstractControl,
  type UntypedFormGroup,
} from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'auth-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styles: `
    :host(auth-sign-up) {
      display: contents;
    }
  `,
})
export class SignUpComponent {
  creditsBy = credits
  currentYear = currentYear
  fieldTextType!: boolean
  fieldTextType1!: boolean
  signupForm!: UntypedFormGroup
  submitted: boolean = false

  public fb = inject(UntypedFormBuilder)

  constructor(private app: AppServiceService, private toastr: ToastrService) {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmpwd: ['', [Validators.required]],
      },
      { validators: this.validateAreEqual }
    )
  }

  public validateAreEqual(c: AbstractControl): { notSame: boolean } | null {
    return c.value.password === c.value.confirmpwd ? null : { notSame: true }
  }

  changetype() {
    this.fieldTextType = !this.fieldTextType
  }

  get form() {
    return this.signupForm.controls
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.submitted = false;
      return;
    }
    const formData = this.signupForm.value;
    this.app.post('signUp', formData).subscribe(
      (res) => {
        if(res.code===200){
          this.toastr.success("User registered successfully!",'Registration Success');
          return;
        }
        if(res.code===409){
          this.toastr.warning("User already registered with this email!",'User Exist');
          return;
        }
      },
      (error) => {
        this.toastr.error(error,'UnExpected Error');
      }
    );

    this.submitted = true;
  }

}
