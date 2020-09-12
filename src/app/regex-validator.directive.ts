import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appRegexValidator]'
})
export class RegexValidatorDirective {

  constructor() { }

}


export function regexValidator(nameRe: RegExp, error: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const match = nameRe.test(control.value);
    return match ? null : { error: error };
  };
}