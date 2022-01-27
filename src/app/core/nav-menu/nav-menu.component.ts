import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  public userAvatar: string = '';

  public readonly menuItems: MenuItem[] = [
    {
      label: 'Memorize',
      icon: 'pi pi-fw pi-book',
      routerLink: ""
    },
  ]
  public user: MenuItem[] = [
    {
      label: 'Log in',
      command: () => this.logIn()
    }
  ]

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.authService.getUser().subscribe({
      next: (user: User | undefined): void => {
        if (user !== undefined) {
          this.userAvatar = user.photoURL;
          this.user = [
            {
              label: user.displayName + ' ' + user.email,
            },
            {
              label: 'Log out',
              command: () => this.authService.signOut(),
            }
          ]
        } else {
          this.userAvatar = '';
          this.user = [
            {
              label: 'Log in',
              command: () => this.logIn()
            }
          ];
        }
      }
    })
  }

  ngOnInit(): void {
  }

  private logIn(): void {
    this.router.navigate(['login']);
  }
}
