import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Usuario} from "../../entities/Usuario";
import {TipoUsuario} from "../../entities/TipoUsuario";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirm: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  ngOnInit(): void {
    if (window.history.state.usuario) {
      const usuario: Usuario = window.history.state.usuario;
      this.form.get('name')?.setValue(usuario.nome);
      this.form.get('email')?.setValue(usuario.email);
    }
  }

  get name() {
    return this.form.get('name');
  }

  get confirm() {
    return this.form.get('confirm');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  next(): void {
    if (this.form.invalid) return;
    const usuario: Usuario = new Usuario();
    const tipoUsuario: TipoUsuario = new TipoUsuario();
    tipoUsuario.id = 2;
    usuario.nome = this.name?.value;
    usuario.email = this.email?.value;
    usuario.senha = this.password?.value;
    usuario.tipoUsuario = tipoUsuario;

    this.router.navigate(['/register', 'personal-data'], {
      state: {usuario}
    })
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}
