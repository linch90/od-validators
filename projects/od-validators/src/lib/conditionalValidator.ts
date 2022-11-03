import { ValidationErrors, ValidatorFn, FormControl } from '@angular/forms';

export const conditionalValidator =
  (predicate: () => boolean, validator: ValidatorFn) =>
  (control: FormControl): ValidationErrors | null => {
    if (!control.parent) return null;
    if (!predicate()) return null;
    return validator(control);
  };
