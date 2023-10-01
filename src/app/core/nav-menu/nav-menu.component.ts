import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { User } from '../../auth/models/user';
import { Store } from '@ngrx/store';
import { loadSignOut, selectAuthUser } from 'src/app/auth/store';
import { ReminderService } from 'src/app/shared/reminder.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent {
  public userAvatar: string = '';

  public readonly menuItems: MenuItem[] = [
    {
      label: 'Memorize',
      icon: 'pi pi-fw pi-book',
      routerLink: '/',
    },
    {
      label: 'Reminder',
      icon: 'pi pi-clock',
      routerLink: 'reminder',
      badgeStyleClass: 'warning',
    },
  ];
  public user: MenuItem[] = [
    {
      label: 'Log in',
      command: () => this.logIn(),
    },
  ];

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly reminderService: ReminderService
  ) {
    this.store.select(selectAuthUser).subscribe({
      next: (user: User | null): void => {
        if (user) {
          this.userAvatar = user.photoURL ?? '';
          this.user = [
            {
              label: user.displayName + ' ' + user.email,
            },
            {
              label: 'Log out',
              command: () => this.store.dispatch(loadSignOut()),
            },
          ];
        } else {
          this.userAvatar = '';
          this.user = [
            {
              label: 'Log in',
              command: () => this.logIn(),
            },
          ];
        }
      },
    });

    this.reminderService
      .getBadgeInfo()
      .pipe(filter((badgeCount: number | undefined): badgeCount is number => badgeCount !== undefined))
      .subscribe((badgeCount: number): void => {
        const foundMenuItem = this.menuItems.find((m) => m.label === 'Reminder');
        if (foundMenuItem) {
          foundMenuItem.badge = badgeCount?.toString();
        }
      });
  }

  private logIn(): void {
    this.router.navigate(['login']);
  }
}
