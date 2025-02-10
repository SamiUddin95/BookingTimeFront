import { Directive, ElementRef, Input, OnInit } from '@angular/core'
import flatpickr from 'flatpickr'
import { Options } from 'flatpickr/dist/types/options'

@Directive({
  selector: '[mwlFlatpickr]',
  standalone: true,
})
export class DateFormInputDirective implements OnInit {
  @Input() flatpickrOptions: Options = {}

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.initFlatpickr()
    this.applyBackgroundColor()
  }

  private initFlatpickr() {
    flatpickr(this.el.nativeElement, this.flatpickrOptions)
  }

  /* Ensure the dropdown itself has a white background, This is a workaround to fix transparent calendar bug */
  private applyBackgroundColor() {
    const element = this.el.nativeElement as HTMLElement
    element.style.backgroundColor = 'white'

    setTimeout(() => {
      const calendarElements = document.querySelectorAll('.flatpickr-calendar, .flatpickr-time')
      calendarElements.forEach(el => (el as HTMLElement).style.backgroundColor = 'white')
    }, 100)
  }

}
