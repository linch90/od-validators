import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const atLeastOneConditionally =
  (
    validator: ValidatorFn,
    dependedControl: string,
    dependedValue: any,
    controls: string[] | null = null
  ) =>
  (group: FormGroup): ValidationErrors | null => {
    if (!controls) {
      controls = Object.keys(group.controls);
    }

    const value = group.get(dependedControl)?.value;
    if (value !== dependedValue) {
      return null;
    }

    const hasAtLeastOne =
      group &&
      group.controls &&
      controls.some((k) => !validator(group.controls[k]));

    return hasAtLeastOne
      ? null
      : {
          atLeastOne: true,
        };
  };
