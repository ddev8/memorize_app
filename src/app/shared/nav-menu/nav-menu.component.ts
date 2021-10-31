import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  public readonly menuItems: MenuItem[] = [
    {
      label: 'Index',
      icon: 'pi pi-fw pi-info-circle',
      routerLink: "/"
    },
    {
      label: 'Memorize',
      icon: 'pi pi-fw pi-book',
      routerLink: "memorize"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
