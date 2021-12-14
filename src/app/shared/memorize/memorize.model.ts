type MemorizePlainObject = {
  id: string,
  text: string,
  description: string,
  progress: number,
  date: string,
  reminderDate: string,
};

export class MemorizeItem {
  private readonly id: string;
  private text: string;
  private description: string;
  private progress: number;
  private readonly date: Date;
  private reminderDate: Date;

  constructor(setup: MemorizePlainObject) {
    this.id = setup.id;
    this.text = setup.text;
    this.description = setup.description;
    this.progress = setup.progress;
    this.date = new Date(setup.date);
    this.reminderDate = new Date(setup.reminderDate);
  }
  public getId(): string {
    return this.id;
  }

  public getText(): string {
    return this.text;
  }

  public getDescription(): string {
    return this.description;
  }

  public getDate(): Date {
    return this.date;
  }

  public getReminderDate(): Date {
    return this.reminderDate;
  }

  public getProgress(): number {
    return this.progress;
  }

  public setText(text: string): void {
    this.text = text;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public incrementProgress(): void {
    if (this.progress === 100 && this.progress + 30 > 100) {
      return;
    }
    this.progress += 30;
  }

  public decrementProgress(): void {
    if (this.progress === 10 && this.progress - 30 <= 0) {
      return;
    }
    this.progress -= 30;
  }

  public toPlainObj(): MemorizePlainObject {
    return {
      id: this.id,
      text: this.text,
      description: this.description,
      date: this.date.toISOString(),
      progress: this.progress,
      reminderDate: this.reminderDate.toISOString(),
    }
  }

  public updateReminderDate(): Date {
    const daysToAdd: number = this.progress === 10 ? 1
      : this.progress === 40 ? 3
        : this.progress === 70 ? 6
          : 0;
    this.reminderDate.setDate(this.reminderDate.getDate() + daysToAdd);

    return this.getReminderDate();
  }
}
