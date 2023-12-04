import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../services/usuario.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  ngOnInit(): void {
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
