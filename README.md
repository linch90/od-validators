Provide complex validators for angular form.

1. atLeastOne, at least one of the `controls` should satisfy the provided `validator`.

```typescript
atLeastOne = (validator, controls: string[] | null) => ...
```

2. atLeastOneConditionally, at least one of the `controls` should satisfy the provided `validator` if the `dependedControl` has the `dependedValue`.

```typescript
atLeastOneConditionally = (
    validator: ValidatorFn,
    dependedControl: string,
    dependedValue: any,
    controls: string[] | null = null
  ) => ...
```

3. requiredConditionally, make `controls` required, if the `dependedControl` has the `dependedValue`.

```typescript
requiredConditionally = (
    dependedControl: string,
    dependedValue: any,
    controls: string[] | null = null
  ) => ...
```

4. requiredConditionally2, make `controls` required, if the `dependedControl` has the `dependedValue` and the `dependedControl2` has the `dependedValue2`.

```typescript
requiredConditionally2 =
  (dependedControl: string, dependedValue: any) =>
  (
    dependedControl2: string,
    dependedValue2: any,
    controls: string[] | null = null
  ) => ...
```

### Examples:

```typescript
let form = this.fb.group(
  {
    airportIcaoIdentifier: [
      airportIcaoIdentifier ?? null,
      [Validators.required, Validators.maxLength(4)],
    ],
    hasTakeoffWeightLimit: [hasTakeoffWeightLimit ?? false, []],
    mtowInKg: [mtowInKg ?? null, []],
    hasLandingWeightLimit: [hasLandingWeightLimit ?? false, []],
    mlwInKg: [mlwInKg ?? null, []],
    takeoffSurfaceConditionLimit: [takeoffSurfaceConditionLimit ?? null, []],
    takeoffTailWindComponentLimitInKt: [
      takeoffTailWindComponentLimitInKt ?? null,
      [],
    ],
    landingSurfaceConditionLimit: [landingSurfaceConditionLimit ?? null, []],
    landingTailWindComponentLimitInKt: [
      landingTailWindComponentLimitInKt ?? null,
      [],
    ],
    remark: [remark ?? null, [Validators.maxLength(200)]],
    aircraftTypeId: [aircraftTypeId ?? null, [Validators.required]],
  },
  {
    validators: [
      atLeastOne(Validators.requiredTrue, [
        "hasTakeoffWeightLimit",
        "hasLandingWeightLimit",
      ]),
      atLeastOneConditionally(
        Validators.required,
        "hasTakeoffWeightLimit",
        true,
        ["takeoffSurfaceConditionLimit", "takeoffTailWindComponentLimitInKt"]
      ),
      atLeastOneConditionally(
        Validators.required,
        "hasLandingWeightLimit",
        true,
        ["landingSurfaceConditionLimit", "landingTailWindComponentLimitInKt"]
      ),
      requiredConditionally("hasTakeoffWeightLimit", true, ["mtowInKg"]),
      requiredConditionally("hasLandingWeightLimit", true, ["mlwInKg"]),
    ],
  }
);
```
