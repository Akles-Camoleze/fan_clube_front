import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomValidators} from "../../../../utils/CustomValidators";

@Component({
  selector: 'app-register-pessoa',
  templateUrl: './register-pessoa.component.html',
  styleUrls: ['./register-pessoa.component.scss'],
})
export class RegisterPessoaComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      birthdate: new FormControl('', [Validators.required, CustomValidators.minAgeValidator(18)]),
      phone: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      uf: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2)
      ]),
    })
  }

  get name() {
    return this.form.get('name');
  }

  get lastname() {
    return this.form.get('lastname');
  }

  get birthdate() {
    return this.form.get('birthdate');
  }

  get phone() {
    return this.form.get('phone');
  }

  get street() {
    return this.form.get('street');
  }

  get number() {
    return this.form.get('number');
  }

  get district() {
    return this.form.get('district');
  }

  get city() {
    return this.form.get('city');
  }

  get uf() {
    return this.form.get('uf');
  }

  enter(): void {
    if (this.form.invalid) return;
  }

  backToUserRegister(): void {
    this.router.navigate(['/register']);
  }
}
