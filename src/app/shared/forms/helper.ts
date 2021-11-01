// More information in https://dev.to/ddev8/strongly-typed-angular-reactive-forms-569i
import { AbstractControl, FormArray, FormGroup } from "@angular/forms";
import { concat, defer, Observable, of } from "rxjs";
import { map } from "rxjs/operators";

/**
 * Form.controls autocomplete with value types.
 */
export type FormControls<T> = {
  [key in keyof T]: T[key] extends TForm<any> | FormArray // If control value has type of TForm (nested form) or FormArray
  ? T[key] // Use type that we define in our FormModel
  : Omit<AbstractControl, 'value'> & { value: T[key] } // Or use custom AbstractControl with typed value
};

export type TForm<T> = FormGroup & {
  value: T; // Not works, why??
  controls: FormControls<T>;
}


interface HasValue {
  value: any;
  valueChanges: Observable<any>;
};

/**
 * Help get control value on init.
 * Forms can return value and obs with value.
 * On form init obs with value always null and only after change it return value.
 * With this construction we can merge value and valueChanges and return value on init.
 */
export function ControlValueChanges<T extends HasValue>(
  control: T
): Observable<T["value"]> {
  return concat<T["value"]>(
    defer(() => of(control.value).pipe(map((val: any) => val === null ? undefined : val))),
    control.valueChanges
  );
};
