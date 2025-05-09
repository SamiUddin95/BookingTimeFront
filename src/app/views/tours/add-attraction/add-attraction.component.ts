import { Component, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropzoneModule, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AttractionService } from '@/app/core/services/api/attraction.service';
import { CommonService } from '@/app/core/services/api/common.service';
import { Footer1Component } from '../../hotels/home/components/footer1/footer1.component' 

@Component({
  selector: 'app-add-attraction',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropzoneModule,
    Footer1Component
  ],
  templateUrl: './add-attraction.component.html',
  styleUrls: ['./add-attraction.component.scss']
})
export class AddAttractionComponent implements OnInit {

  @ViewChildren(NgModel) formFields!: QueryList<NgModel>;

  dropzoneConfig: DropzoneConfigInterface = {
    url: '#',
    maxFiles: 5,
    maxFilesize: 5,
    acceptedFiles: 'image/jpeg, image/png, image/gif',
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Remove'
  };

  isSubmitted: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  currentStep = 1;
  totalSteps = 2;

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
    else if (this.currentStep == this.totalSteps) {
      this.submit();
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(stepId: number): void {
    this.currentStep = stepId;
  }

  private attractionService = inject(AttractionService);
  private commonService = inject(CommonService);

  attractionForm = {
    cityId: 0,
    title: '',
    shortDescription: '',
    detailedDescription: '',
    price: 0,
    rating: 0,
    categoryId: 0,
    images: [] as File[],
    thumbnail: undefined as File | undefined
  };

  cities: any;
  categories: any;

  ngOnInit(): void {
    this.loadDropdowns();
  }

  loadDropdowns() {
    forkJoin({
      cities: this.commonService.GetAllCityList(),
      categories: this.attractionService.GetAllAttractionCategories()
    }).subscribe(res => {
      this.cities = res.cities;
      this.categories = res.categories;
    });
  }

  onGalleryImageAdded(file: File) {

    console.log(file)
    this.attractionForm.images.push(file);
  }

  isFormValid(): boolean {
    const f = this.attractionForm;
    return f.cityId > 0 &&
      f.title.trim() !== '' &&
      f.shortDescription.trim() !== '' &&
      f.detailedDescription.trim() !== '' &&
      f.price > 0 &&
      f.categoryId > 0;
  }

  submit() {
    if (!this.isFormValid()) {
      this.isSubmitted = true;
      return;
    }

    const formData = new FormData();
    formData.append('cityId', this.attractionForm.cityId.toString());
    formData.append('title', this.attractionForm.title);
    formData.append('shortDescription', this.attractionForm.shortDescription);
    formData.append('detailedDescription', this.attractionForm.detailedDescription);
    formData.append('price', this.attractionForm.price.toString());
    formData.append('rating', this.attractionForm.rating.toString());
    formData.append('categoryId', this.attractionForm.categoryId.toString());

    for (let file of this.attractionForm.images) {
      formData.append('images', file); 
    }

    this.attractionService.CreateAttraction(formData).subscribe(res => {
      if (res && res.id) {
        this.router.navigate(['success'], { relativeTo: this.route });
      }
    });
  }

  steps = [
    { id: 1, label: 'Basic Information' },
    { id: 2, label: 'Upload Pictures' }
  ];
}
