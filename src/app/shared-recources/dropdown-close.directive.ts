import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdownClose]'
})
export class DropdownCloseDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  flag = false;

  @HostListener('mouseleave') mouseleave(event: Event) {
    console.log('directive triggred!');
    this.renderer.removeClass(this.elRef.nativeElement, 'show');
    this.flag = false;
  }

}
