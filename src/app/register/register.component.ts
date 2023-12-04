import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../services/usuario.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      date: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirm: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  get name() {
    return this.form.get('email');
  }

  get date() {
    return this.form.get('email');
  }

  get phone() {
    return this.form.get('email');
  }

  get confirm() {
    return this.form.get('email');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  enter(): void {
    if (this.form.invalid) return;

    this.usuarioService.login(this.email!.value, this.password!.value).subscribe(usuario => {
      console.log(usuario);
    });

  }
}
