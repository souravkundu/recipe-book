import { Directive, HostBinding, HostListener, Input, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Directive({
  selector: '[appAddClassOnClick]'
})
export class AddClassOnClickDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  flag = false;
  @Input('appAddClassOnClick') className: string;

  @HostListener('click') mouseclick(event: Event) {
    this.flag = !this.flag;
    if ( this.flag ) {
      this.renderer.addClass(this.elRef.nativeElement, this.className);
     } else {
      this.renderer.removeClass(this.elRef.nativeElement, this.className);
    }
  }
}
