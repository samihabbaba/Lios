import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MenuItem } from 'src/app/models/menuItem';

@Directive({
  selector: '[appNavItem]',
})
export class NavItemDirective {
  constructor(private elRef: ElementRef) {}
  @Input('appNavItem') navItem: MenuItem;

  @HostListener('document: click', ['$event']) toggleNavItem(event: any) {
    if (
      !this.elRef.nativeElement.contains(event.target) ||
      (this.elRef.nativeElement.classList.contains('toggled') &&
        this.elRef.nativeElement.contains(event.target))
    ) {
      this.elRef.nativeElement.classList.remove('toggled');
      return;
    }
    if (
      !this.navItem.toggled &&
      this.elRef.nativeElement.contains(event.target)
    ) {
      this.elRef.nativeElement.classList.add('toggled');
    }
  }
}
