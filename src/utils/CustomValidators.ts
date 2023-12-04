import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  static minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const birthDate: Date = new Date(control.value);
      const today: Date = new Date();
      const age: number = today.getFullYear() - birthDate.getFullYear();

      if (age < minAge) {
        return { minAge: { requiredAge: minAge, actualAge: age } };
      }

      return null;
    };
  }

}
