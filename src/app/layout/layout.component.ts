import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  visibleSidebar: boolean;

  constructor() {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.visibleSidebar = !this.visibleSidebar;
  }
}
