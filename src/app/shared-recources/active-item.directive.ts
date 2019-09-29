import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appActiveItem]'
})
export class ActiveItemDirective {

  constructor(private elfRef: ElementRef, private rederer: Renderer2) { }

  @HostListener('mouseenter') mouseenter(event: Event) {
    this.rederer.addClass(this.elfRef.nativeElement,'activeLink');
  }

  @HostListener('mouseleave') mouseleave(event: Event) {
    this.rederer.removeClass(this.elfRef.nativeElement,'activeLink');
  }

}
