import { FormGroup, ValidationErrors, Validators } from '@angular/forms';

export const requiredConditionally =
  (
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

    const required =
      group &&
      group.controls &&
      controls.every((k) => !Validators.required(group.controls[k]));

    return required
      ? null
      : {
          required: true,
        };
  };

export const requiredConditionally2 =
  (dependedControl: string, dependedValue: any) =>
  (
    dependedControl2: string,
    dependedValue2: any,
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

    const value2 = group.get(dependedControl2)?.value;
    if (value2 !== dependedValue2) {
      return null;
    }

    const required =
      group &&
      group.controls &&
      controls.every((k) => !Validators.required(group.controls[k]));

    return required
      ? null
      : {
          required: true,
        };
  };
