import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ReminderService } from 'src/app/shared/reminder.service';
import { MemorizeItem } from '../shared/models/memorize.model';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { updateMemorizeItem } from '../store';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent {
  public items$: Observable<MemorizeItem[]>;
  constructor(private readonly reminderService: ReminderService, private readonly store: Store) {
    this.items$ = this.reminderService
      .getItems()
      .pipe(filter((items: MemorizeItem[] | undefined): items is MemorizeItem[] => items !== undefined));
  }

  public checkItem(memorizeItem: MemorizeItem): void {
    memorizeItem.incrementProgress();
    memorizeItem.updateReminderDate();
    this.store.dispatch(updateMemorizeItem({ item: memorizeItem }));
  }
}
