import { SelectFormInputDirective } from '@/app/components/form/select-form-input.directive'
import { StaysService } from '@/app/core/services/api/stays.service'
import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'detail-customer-review',
  standalone: true,
  imports: [SelectFormInputDirective, NgbProgressbarModule, ReactiveFormsModule, CommonModule],
  templateUrl: './customer-review.component.html',
  styles: `
    :host(detail-customer-review) {
      display: contents !important;
    }
  `,
})
export class CustomerReviewComponent implements OnInit {

  private staysService = inject(StaysService)
  reviewForm!: FormGroup

  ngOnInit(): void {
    this.loadReviews()
  }

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { 
    this.reviewForm = this.fb.group({
      propertyId: [this.getPropertyIdFromParameter()], 
      userId: [10018], //currently hardcoded, needs to be fetched from the session
      ratingId: ['5'],     
      review: ['']      
    });
  }

  reqBody: any = {}
  postBody: any = {}
  reviews: any

  loadReviews() {
    this.reqBody.propertyId = this.getPropertyIdFromParameter();
    this.reqBody.paginationInfo = {}
    this.staysService.GetReviewList(this.reqBody).subscribe((res => {
      this.reviews = res;
      console.log(res);
    }))
  }

  postReview() {
    if (this.reviewForm.valid && this.reviewForm.controls['review'].value.trim() !== '') {
      const reqBody = this.reviewForm.value;
      this.staysService.AddPropertyReview(reqBody).subscribe((res) => {
        this.reviewForm.reset();
        this.loadReviews();
      })
    }
  }

  getPropertyIdFromParameter() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }
}
