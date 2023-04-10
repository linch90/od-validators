import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const atLeastOne =
  (
    validator: ValidatorFn,
    controls: string[] | null = null,
    index: number = 1
  ) =>
  (group: FormGroup): ValidationErrors | null => {
    if (!controls) {
      controls = Object.keys(group.controls);
    }

    const hasAtLeastOne =
      group &&
      group.controls &&
      controls.some((k) => !validator(group.controls[k]));

    if (!hasAtLeastOne) {
      controls.forEach((k) => {
        const control = group.controls[k];
        control.setErrors({
          atLeastOne: {
            index: index,
          },
        });
      });
    }

    return hasAtLeastOne
      ? null
      : {
          atLeastOne: true,
        };
  };
