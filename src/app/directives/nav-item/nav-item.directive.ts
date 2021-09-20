import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNavItem]',
})
export class NavItemDirective {
  constructor(private elRef: ElementRef) {}
  @Input('appNavItem') navItem: any;

  @HostListener('document: click', ['$event']) toggleNavItem(event: any) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.elRef.nativeElement.classList.remove('toggled');
    }
    if (
      !this.navItem.toggled &&
      this.elRef.nativeElement.contains(event.target)
    ) {
      this.elRef.nativeElement.classList.add('toggled');
    }
  }
}
