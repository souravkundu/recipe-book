import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  flag = false;
  @HostListener('click') mouseclick(event: Event) {
    this.flag = !this.flag;
    // console.log("inside directive");
    if (this.flag) {
      this.renderer.addClass(this.elRef.nativeElement, 'show');
      this.renderer.addClass(this.elRef.nativeElement.children[1], 'show');
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, 'show');
      this.renderer.removeClass(this.elRef.nativeElement.children[1], 'show');
    }
  }

  @HostListener('mouseleave') mouseleave(event: Event) {
    this.renderer.removeClass(this.elRef.nativeElement, 'show');
    // this.renderer.removeClass(this.elRef.nativeElement.children[1], 'show');
    this.flag = false;
  }

}
