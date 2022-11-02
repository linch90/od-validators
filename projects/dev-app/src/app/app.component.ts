import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  atLeastOne,
  atLeastOneConditionally,
  requiredConditionally,
} from '@linch90/od-validators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AirportLimitWeightDto } from '../models/models';
import { surfaceConditionLimitOptions } from '../models/surface-condition-limit.enum';
import { tailWindComponentLimitInKtOptions } from '../models/tail-wind-component-limit-in-kt.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form: FormGroup;

  surfaceConditionLimitOptions = surfaceConditionLimitOptions;

  tailWindComponentLimitInKtOptions = tailWindComponentLimitInKtOptions;

  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  buildForm() {
    const {
      airportIcaoIdentifier,
      hasTakeoffWeightLimit,
      mtowInKg,
      hasLandingWeightLimit,
      mlwInKg,
      takeoffSurfaceConditionLimit,
      takeoffTailWindComponentLimitInKt,
      landingSurfaceConditionLimit,
      landingTailWindComponentLimitInKt,
      aircraftTypeId,
      remark,
    } = {} as AirportLimitWeightDto;

    this.form = this.fb.group(
      {
        airportIcaoIdentifier: [
          airportIcaoIdentifier ?? null,
          [Validators.required, Validators.maxLength(4)],
        ],
        hasTakeoffWeightLimit: [hasTakeoffWeightLimit ?? false, []],
        mtowInKg: [mtowInKg ?? null, []],
        hasLandingWeightLimit: [hasLandingWeightLimit ?? false, []],
        mlwInKg: [mlwInKg ?? null, []],
        takeoffSurfaceConditionLimit: [
          takeoffSurfaceConditionLimit ?? null,
          [],
        ],
        takeoffTailWindComponentLimitInKt: [
          takeoffTailWindComponentLimitInKt ?? null,
          [],
        ],
        landingSurfaceConditionLimit: [
          landingSurfaceConditionLimit ?? null,
          [],
        ],
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
            'hasTakeoffWeightLimit',
            'hasLandingWeightLimit',
          ]),
          atLeastOneConditionally(
            Validators.required,
            'hasTakeoffWeightLimit',
            true,
            [
              'takeoffSurfaceConditionLimit',
              'takeoffTailWindComponentLimitInKt',
            ]
          ),
          atLeastOneConditionally(
            Validators.required,
            'hasLandingWeightLimit',
            true,
            [
              'landingSurfaceConditionLimit',
              'landingTailWindComponentLimitInKt',
            ]
          ),
          requiredConditionally('hasTakeoffWeightLimit', true, ['mtowInKg']),
          requiredConditionally('hasLandingWeightLimit', true, ['mlwInKg']),
        ],
      }
    );
  }

  open(content: any) {
    this.buildForm();
    this.modalService.open(content, { size: 'lg' });
  }
}
