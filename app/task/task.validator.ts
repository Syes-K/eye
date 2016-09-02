import { Directive, Attribute, forwardRef } from '@angular/core';
import {NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

var refnoRegExp = /^[0-9a-zA-Z]*$/;
const REFNO_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => RefNoValidator),
    multi: true
};
@Directive({
    selector: '[refno-validator]',
    providers: [REFNO_VALIDATOR]
})
export class RefNoValidator implements Validator {
    constructor( @Attribute("refno-validator") private _refnoValidator) {
        console.log(this._refnoValidator);
    }

    validate(c: AbstractControl): { [key: string]: any } {
        if (refnoRegExp.test(c.value)) {
            return null;
        } else {
            return { "refNo": { valid: false,msg:'232' } };
        }

    }
}